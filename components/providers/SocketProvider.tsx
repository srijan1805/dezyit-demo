"use client";

import { useAppDispatch } from "@/hooks/redux";
import { setWorkspaces } from "@/redux/workspace.reducer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Socket, io } from "socket.io-client";

type Props = {};

const SocketContext = createContext<{
  socket: null | Socket;
}>({
  socket: null,
});

export function useSocket() {
  return useContext(SocketContext);
}

function SocketProvider({ children }: React.PropsWithChildren<Props>) {
  const [socket, setSocket] = useState<Socket | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const socketInitializer = async () => {
      const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL ?? "", {
        query: {
          secretToken: process.env.NEXT_PUBLIC_AUTH_TOKEN,
        },
        transports: ["websocket"],
        // extraHeaders: {
        //   "Access-Control-Allow-Origin": "http://localhost:5000",
        // },
      });

      socket.on("connect", () => {
        console.log("connected");
        toast.success("Socket connected", {
          toastId: "socket-connected",
        });
        setSocket(socket);
      });

      socket.emit("getAllWorkspaces");

      socket.on("successResponse", (data: SuccessResponse) => {
        switch (data.type) {
          case "workspaces_fetched":
            dispatch(setWorkspaces(data.response.workspaces));
            break;

          default:
            console.log("unknown event type", data.type);
        }
        console.log("data", data);
      });
    };

    socketInitializer();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
