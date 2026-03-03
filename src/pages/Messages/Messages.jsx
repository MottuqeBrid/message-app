import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";

const Messages = () => {
  const { user } = useAuth();
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingByFriend, setTypingByFriend] = useState({});
  const [socketReady, setSocketReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosSecure();
  const socketRef = useRef(null);
  const selectedFriendIdRef = useRef(null);
  const currentUserIdRef = useRef(null);

  const currentUserId = user?._id || user?.id;

  useEffect(() => {
    selectedFriendIdRef.current = selectedFriendId;
  }, [selectedFriendId]);

  useEffect(() => {
    currentUserIdRef.current = currentUserId;
  }, [currentUserId]);

  const fetchFriends = async () => {
    setLoadingFriends(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/friends/all");
      const { friends } = res.data || {};
      const friendList = Array.isArray(friends) ? friends : [];
      setFriends(friendList);
      if (friendList.length > 0) {
        setSelectedFriendId((prev) => prev || friendList[0]._id);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoadingFriends(false);
    }
  };

  const fetchConversation = async (friendId) => {
    if (!friendId) return;
    setLoadingConversation(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/messages/conversation/${friendId}`);
      const messages = Array.isArray(res.data?.data) ? res.data.data : [];
      setConversation(messages);
      await axiosInstance.patch(`/messages/read/${friendId}`);
    } catch (error) {
      setError(error);
      setConversation([]);
    } finally {
      setLoadingConversation(false);
    }
  };

  useEffect(() => {
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedFriendId) return;
    fetchConversation(selectedFriendId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFriendId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000",
      {
        withCredentials: true,
        auth: token ? { token } : undefined,
      },
    );

    socketRef.current = socket;

    socket.on("socket:ready", () => {
      setSocketReady(true);
    });

    socket.on("message:received", ({ success, data }) => {
      if (!success || !data) return;

      const senderId = data.sender?._id;
      const receiverId = data.receiver?._id;

      const activeFriendId = selectedFriendIdRef.current;
      const activeUserId = currentUserIdRef.current;
      if (!activeFriendId || !activeUserId) return;

      const isForCurrentChat =
        (senderId === activeFriendId && receiverId === activeUserId) ||
        (senderId === activeUserId && receiverId === activeFriendId);

      if (isForCurrentChat) {
        setConversation((prev) => [...prev, data]);
      }
    });

    socket.on("message:typing", ({ from, isTyping }) => {
      setTypingByFriend((prev) => ({
        ...prev,
        [from]: Boolean(isTyping),
      }));
    });

    socket.on("disconnect", () => {
      setSocketReady(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setSocketReady(false);
    };
  }, [currentUserId]);

  const emitTyping = (isTyping) => {
    if (!selectedFriendId || !socketRef.current) return;
    socketRef.current.emit("message:typing", {
      receiverId: selectedFriendId,
      isTyping,
    });
  };

  const handleSendMessage = async (content) => {
    const text = content?.trim();
    if (!text || !selectedFriendId || sending) return;

    setSending(true);
    setError(null);
    try {
      await axiosInstance.post("/messages/send", {
        receiverId: selectedFriendId,
        content: text,
        messageType: "text",
      });
      setNewMessage("");
      emitTyping(false);
    } catch (error) {
      setError(error);
    } finally {
      setSending(false);
    }
  };

  const selectedFriend = useMemo(
    () => friends.find((friend) => friend._id === selectedFriendId) || null,
    [friends, selectedFriendId],
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold">Messages</h1>
        <p className="text-base-content/70 mt-1">
          Select a friend to open message options.
        </p>
      </header>

      {error && (
        <div role="alert" className="alert alert-error">
          <span>
            {error?.response?.data?.message || "Failed to load messages."}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-4">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-xl font-semibold">Friends</h2>

              {loadingFriends ? (
                <p className="text-sm text-base-content/70 mt-2">
                  Loading friend list...
                </p>
              ) : (
                <div className="mt-3 space-y-2 max-h-90 overflow-y-auto scroll-auto">
                  {friends.map((friend) => (
                    <button
                      key={friend._id}
                      onClick={() => setSelectedFriendId(friend._id)}
                      className={`w-full text-left p-3 rounded-xl border transition ${
                        selectedFriendId === friend._id
                          ? "border-primary bg-primary/10"
                          : "border-base-300 hover:bg-base-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src={friend.image?.profile}
                              alt={friend.name}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">
                            {friend.name}{" "}
                            {friend.isActive ? "(Online)" : "(Offline)"}
                          </p>
                          <p className="text-xs text-base-content/70">
                            {typingByFriend[friend._id]
                              ? "Typing..."
                              : "Tap to open chat"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-8">
          <div className="card bg-base-100 border border-base-300 shadow-sm min-h-80">
            <div className="card-body p-5">
              {!selectedFriend ? (
                <p className="text-base-content/70">
                  Pick a friend from the list to see message options.
                </p>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          src={selectedFriend.image?.profile}
                          alt={selectedFriend.name}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {selectedFriend.name}
                      </h3>
                      <p className="text-sm text-base-content/70">
                        {socketReady ? "Connected" : "Connecting..."}
                      </p>
                    </div>
                  </div>

                  <div className="divider my-4" />

                  <div className="space-y-2 mb-5 max-h-96 overflow-y-auto scroll-auto">
                    {loadingConversation ? (
                      <p className="text-sm text-base-content/70">
                        Loading conversation...
                      </p>
                    ) : conversation.length === 0 ? (
                      <p className="text-sm text-base-content/70">
                        No messages yet. Start the conversation.
                      </p>
                    ) : (
                      conversation.map((msg) => {
                        const senderId = msg.sender?._id;
                        const isMine = senderId === currentUserId;
                        return (
                          <div
                            key={msg._id}
                            className={`chat ${isMine ? "chat-end" : "chat-start"}`}
                          >
                            <div
                              className={`chat-bubble ${isMine ? "chat-bubble-primary" : ""}`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="divider my-4" />

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(event) => {
                        const text = event.target.value;
                        setNewMessage(text);
                        emitTyping(Boolean(text.trim()));
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSendMessage(newMessage);
                        }
                      }}
                      placeholder="Type a message"
                      className="input input-bordered w-full"
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleSendMessage(newMessage)}
                      disabled={sending || !newMessage.trim()}
                    >
                      {sending ? "Sending..." : "Send"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
