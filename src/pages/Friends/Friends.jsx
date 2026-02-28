import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const Friends = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const axiosInstance = useAxiosSecure();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/friends/all");
      const { friends, requests, suggestions } = res.data || {};
      setFriends(Array.isArray(friends) ? friends : []);
      setRequests(Array.isArray(requests) ? requests : []);
      setFriendSuggestions(Array.isArray(suggestions) ? suggestions : []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendFriendRequest = async (userId) => {
    setActionLoadingId(userId);
    try {
      const res = await axiosInstance.patch(`/friends/request/${userId}`);
      if (res.data?.success) {
        Swal.fire({
          icon: "success",
          title: res.data.message || "Request sent",
          timer: 1200,
          showConfirmButton: false,
        });
        await fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: res.data.message || "Request failed",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      setError(error);
      Swal.fire({
        icon: "error",
        title: "Request failed",
        timer: 1200,
        showConfirmButton: false,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const actionResponse = async (requestId, action) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this friend request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setActionLoadingId(requestId);
    try {
      const res = await axiosInstance.patch(
        `/friends/action/${requestId}?action=${action}`,
      );

      if (res.data?.success) {
        Swal.fire({
          icon: "success",
          title:
            res.data.message ||
            (action === "accept" ? "Request accepted" : "Request declined"),
          timer: 1200,
          showConfirmButton: false,
        });
        await fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: res.data.message || "Request failed",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      setError(error);
      Swal.fire({
        icon: "error",
        title: "Request failed",
        timer: 1200,
        showConfirmButton: false,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <section className="p-4 md:p-6 lg:p-8 space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Friends</h1>

          <p className="text-base-content/70 mt-1">
            Connect, accept requests, and find new people.
          </p>
        </div>
        <div className="join">
          <button className="btn btn-primary join-item">Friend Requests</button>
          <button className="btn btn-outline join-item">Suggestions</button>
          <button className="btn btn-outline join-item">All Friends</button>
        </div>
      </header>

      {error && (
        <div role="alert" className="alert alert-error">
          <span>
            {error?.response?.data?.message || "Failed to load friends data."}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <aside className="xl:col-span-3">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-xl font-semibold text-base-content">
                Friends ({friends.length})
              </h2>
              <div className="space-y-3 mt-2">
                {loading ? (
                  <p className="text-sm text-base-content/70">
                    Loading friends...
                  </p>
                ) : friends.length === 0 ? (
                  <p className="text-sm text-base-content/70">
                    No friends yet.
                  </p>
                ) : (
                  friends.map((friend) => (
                    <div
                      key={friend._id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="avatar online">
                          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                            <img
                              src={
                                friend.image?.profile ||
                                "https://i.pravatar.cc/100"
                              }
                              alt={friend.name}
                            />
                          </div>
                        </div>
                        <span className="font-medium text-base-content">
                          {friend.name}
                        </span>
                      </div>
                      <button className="btn btn-ghost btn-xs">Message</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </aside>

        <main className="xl:col-span-9 space-y-6">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-base-content">
                  Friend Requests ({requests.length})
                </h2>
                <button className="btn btn-ghost btn-sm">See all</button>
              </div>

              <div className="mt-4 space-y-4">
                {loading ? (
                  <p className="text-sm text-base-content/70">
                    Loading requests...
                  </p>
                ) : requests.length === 0 ? (
                  <p className="text-sm text-base-content/70">
                    No pending requests.
                  </p>
                ) : (
                  requests.map((request) => (
                    <article
                      key={request._id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border border-base-300 bg-base-200/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-14 rounded-full">
                            <img
                              src={
                                request.image?.profile ||
                                "https://i.pravatar.cc/120"
                              }
                              alt={request.name}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-base-content">
                            {request.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => actionResponse(request._id, "accept")}
                          className="btn btn-primary btn-sm"
                          disabled={actionLoadingId === request._id}
                        >
                          {actionLoadingId === request._id
                            ? "Working..."
                            : "Confirm"}
                        </button>
                        <button
                          onClick={() => actionResponse(request._id, "reject")}
                          className="btn btn-ghost btn-sm"
                          disabled={actionLoadingId === request._id}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-base-content">
                  People You May Know ({friendSuggestions.length})
                </h2>
                <button
                  onClick={fetchData}
                  className="btn btn-ghost btn-sm"
                  disabled={loading}
                >
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {loading ? (
                  <p className="text-sm text-base-content/70">
                    Loading suggestions...
                  </p>
                ) : friendSuggestions.length === 0 ? (
                  <p className="text-sm text-base-content/70">
                    No suggestions right now.
                  </p>
                ) : (
                  friendSuggestions.map((person) => (
                    <article
                      key={person._id}
                      className="rounded-xl border border-base-300 overflow-hidden bg-base-200/40"
                    >
                      <div className="h-40 bg-base-300">
                        <img
                          src={
                            person?.image?.profile ||
                            "https://i.pravatar.cc/240"
                          }
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <p className="font-semibold text-base-content">
                            {person.name}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => sendFriendRequest(person._id)}
                            className="btn btn-primary btn-sm flex-1"
                            disabled={actionLoadingId === person._id}
                          >
                            {actionLoadingId === person._id
                              ? "Sending..."
                              : "Add Friend"}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Friends;
