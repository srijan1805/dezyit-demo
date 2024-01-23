"use client";
import { useSocket } from "@/components/providers/SocketProvider";
import Spinner from "@/components/ui/Spinner";
import { Sprint } from "@/types";
import { ErrorResponse, SuccessResponse } from "@/types/socket";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SprintCard from "../_components/SprintCard";
import SprintsContainer from "../_components/SprintsContainer";

function LegacyPage() {
    const { socket } = useSocket();
    const [loading, setLoading] = useState(true);
    const [sprints, setSprints] = useState<Sprint[]>([]);

    useEffect(() => {
        socket?.emit("fetchSprintList", {
            pageNumber: 1,
            workspaceId: "legacy",
            limit: 20,
        });

        socket?.on("successResponse", (data: SuccessResponse) => {
            if (data.type === "sprint_list") {
                setSprints(data.response.sprintList);
                setLoading(false);
            }
        });

        socket?.on("errorInfo", (data: ErrorResponse) => {
            setLoading(false);
            toast.error("Error fetching sprints");
        });
    }, [socket?.connected]);

    return (
        <div className="flex flex-col items-start justify-start h-full w-full space-y-6">
            <div className="inline-flex flex-row items-center justify-between w-full gap-3">
                <div className="text-xl capitalize flex items-center space-x-2">
                    <span>Legacy Sprints</span>
                </div>
            </div>
            <div className="divider" />

            <SprintsContainer sprints={sprints} loading={loading} />
        </div>
    );
}

export default LegacyPage;
