import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Messages = () => {
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState([]);

  // REST API call
  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => console.log(res.data));
  }, []);

  // Socket listener
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setServerMessage((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", message);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border"
      />
      <button className="btn" onClick={sendMessage}>
        Send
      </button>

      <div className="divider" />

      <div>
        Server:{" "}
        <ol>
          {serverMessage.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Messages;
