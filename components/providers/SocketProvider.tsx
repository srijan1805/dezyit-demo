"use client";

import { useAppDispatch } from "@/hooks/redux";
import { setSprints } from "@/redux/sprints.reducer";
import {
    addWorkspace,
    setWorkspaces,
    updateWorkspace,
} from "@/redux/workspace.reducer";
import { Workspace } from "@/types";
import { ErrorResponse, SuccessResponse } from "@/types/socket";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

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

            socket.on("disconnect", () => {
                console.log("connected");
                toast.error("Socket Disconnected", {
                    toastId: "socket-disconnected",
                });
                setSocket(null);
            });

            socket.emit("getAllWorkspaces");

            socket.on("errorInfo", (data: ErrorResponse) => {
                toast.error(data.message);
            });

            socket.on("successResponse", (data: SuccessResponse) => {
                console.log("data", data);

                switch (data.type) {
                    case "workspaces_fetched":
                        dispatch(setWorkspaces(data.response.workspaces));
                        break;

                    case "workspace_created":
                        const workspace: Workspace = data.response
                            .workspace as Workspace;
                        dispatch(addWorkspace(workspace));
                        if (
                            workspace.owner.userId ===
                            "64831dcb52328b92810508c1"
                        ) {
                            router.push(`/${workspace.slug}`);
                        }
                        break;
                    case "workspace_updated":
                        dispatch(updateWorkspace(data.response.workspace));
                        break;
                    case "workspace_member_added":
                        dispatch(updateWorkspace(data.response.workspace));
                        break;
                    case "workspace_member_removed":
                        dispatch(updateWorkspace(data.response.workspace));
                        break;
                    // case "sprint_list":
                    //   dispatch(setSprints(data.response.sprintList));
                    //   break;

                    default:
                        console.log("unknown event type", data.type);
                }
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
