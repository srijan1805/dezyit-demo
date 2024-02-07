"use client";

import { useSocket } from "@/components/providers/SocketProvider";
import { Sprint } from "@/types";
import { SuccessResponse } from "@/types/socket";
import React, { useEffect, useState } from "react";
import SprintsContainer from "../_components/SprintsContainer";

function RecentPage() {
    const { socket } = useSocket();
    const [loading, setLoading] = useState(true);
    const [sprints, setSprints] = useState<Sprint[]>([]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.emit("fetchSprintList", {
            pageNumber: 1,
            workspaceId: "recent",
        });

        socket.on("successResponse", (data: SuccessResponse) => {
            if (data.type === "sprint_list") {
                setSprints(data.response.sprintList);

                setLoading(false);
            }
        });
    }, []);
    return (
        <div className="flex flex-col items-start justify-start h-full w-full space-y-6">
            <div className="inline-flex flex-row items-center justify-between w-full gap-3">
                <div className="text-xl capitalize flex items-center space-x-2">
                    <span>Recent Sprints</span>
                </div>
            </div>
            <div className="divider" />

            <SprintsContainer sprints={sprints} loading={loading} />
        </div>
    );
}

export default RecentPage;
