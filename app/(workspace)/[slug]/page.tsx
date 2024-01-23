"use client";

import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import TrialAlert from "../_components/TrialAlert";
import { useEffect, useMemo, useState } from "react";
import { useSocket } from "@/components/providers/SocketProvider";
import { Sprint } from "@/types";
import { ErrorResponse, SuccessResponse } from "@/types/socket";
import { toast } from "react-toastify";
import SprintsContainer from "../_components/SprintsContainer";

export default function WorkspacePage({
    params,
}: {
    params: { slug: string };
}) {
    const { workspaces } = useAppSelector((state) => state.workspace);

    const workspace = workspaces.find(
        (workspace) => workspace.slug === params.slug
    );

    const { socket } = useSocket();
    const [loading, setLoading] = useState(true);
    const [sprints, setSprints] = useState<Sprint[]>([]);

    useEffect(() => {
        if (workspace) {
            socket?.emit("fetchSprintList", {
                pageNumber: 1,
                workspaceId: workspace._id,
                limit: 20,
            });
        }

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
    }, [socket?.connected, workspace?._id]);

    return (
        <>
            {workspace && (
                <>
                    <div className="inline-flex flex-row items-center justify-between w-full gap-3">
                        <div className="text-xl capitalize flex items-center space-x-2">
                            <span>{workspace.name}</span>
                            {workspace.subscription === "pro" && (
                                <span className="badge badge-warning">pro</span>
                            )}
                        </div>
                        <Link
                            href={`${workspace.slug}/manage`}
                            className="btn btn-neutral"
                        >
                            Manage Workspace
                        </Link>
                    </div>
                    {workspace.subscription === "free" && (
                        <TrialAlert workspace={workspace} />
                    )}
                    <div className="divider" />

                    <SprintsContainer sprints={sprints} loading={loading} />
                </>
            )}
        </>
    );
}
