"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

type Props = {};

function SocketProvider({ children }: React.PropsWithChildren<Props>) {
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
      });
    };

    socketInitializer();
  }, []);

  return <div>{children}</div>;
}

export default SocketProvider;
