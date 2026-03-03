import { createContext, useEffect } from "react";
import { socket } from "../lib/socket";
import useAuth from "../hook/useAuth";

const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      socket.connect();
      socket.emit("user:join", { userId: user._id });
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
