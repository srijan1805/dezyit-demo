"use client";

import { useAppSelector } from "@/hooks/redux";
import React, { useEffect, useState } from "react";
import TrialAlert from "../../_components/TrialAlert";
import { useSocket } from "@/components/providers/SocketProvider";
import MemberCard from "../../_components/MemberCard";
import AddMember from "../../_components/AddMember";
import { WorkspaceMember, WorkspaceRole } from "@/types";
import SubscriptionDetails from "../../_components/SubscriptionDetails";

function ManageWorkspace({ params }: { params: { slug: string } }) {
    const { workspaces } = useAppSelector((state) => state.workspace);
    const workspace = workspaces.find(
        (workspace) => workspace.slug === params.slug
    );

    const [name, setName] = useState<string>("");
    const [role, setRole] = useState<WorkspaceRole>("edit");
    const [email, setEmail] = useState<string>("");
    const [members, setMembers] = useState<WorkspaceMember[]>([]);

    const { socket } = useSocket();

    useEffect(() => {
        setName(workspace?.name ?? "");
        setMembers(workspace?.members ?? []);
    }, [workspace?.name, workspace?.members.length]);

    function handleRename() {
        socket?.emit("updateWorkspace", {
            workspaceId: workspace?._id,
            name,
        });
    }

    function handleRemove(userId: string) {
        socket?.emit("removeWorkspaceMember", {
            userId,
            workspaceId: workspace?._id,
        });
    }

    function handleAddMember(m: WorkspaceMember) {
        // setMembers((prev) => [...prev, m]);

        socket?.emit("addWorkspaceMember", {
            email: m.email,
            role: m.role,
            workspaceId: workspace?._id,
        });

        setEmail("");
        setRole("edit");
    }

    return (
        <>
            {workspace && (
                <>
                    {workspace.subscriptionStatus === "free" && (
                        <TrialAlert workspace={workspace} />
                    )}
                    <div className="">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">
                                    Workspace Name
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full capitalize"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                <button
                                    onClick={() => handleRename()}
                                    className="btn btn-neutral"
                                >
                                    Rename
                                </button>
                            </div>
                        </label>
                    </div>

                    <AddMember
                        email={email}
                        setEmail={setEmail}
                        role={role}
                        setRole={setRole}
                        handleAddMember={handleAddMember}
                        hideLabel
                    />

                    {members.map((m, i) => (
                        <MemberCard
                            member={m}
                            key={`member-card-${m.userId}-${i}`}
                            showDeleteBtn
                            handleRemove={handleRemove}
                        />
                    ))}

                    <div className="divider"></div>
                    {workspace && <SubscriptionDetails workspace={workspace} />}

                    <div className="divider"></div>

                    <div
                        role="alert"
                        className="alert shadow-lg flex justify-between justify-self-end"
                    >
                        <div className="text-start">
                            <h3 className="font-bold">Delete this workspace</h3>
                            <div className="text-xs">
                                Once you delete a workspace, there is no going
                                back. Please be certain.
                            </div>
                        </div>
                        <button className="btn btn-sm btn-outline btn-error">
                            Delete
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default ManageWorkspace;
