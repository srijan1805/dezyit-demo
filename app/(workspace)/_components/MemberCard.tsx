"use client";

import Dropdown from "@/components/ui/Dropdown";
import { accessOptions } from "@/lib/constants";
import { WorkspaceMember, WorkspaceRole } from "@/types";
import React, { useState } from "react";

type Props = {
    member: WorkspaceMember;
    showDeleteBtn?: true;
    handleRemove?: (userId: string) => void;
};

function MemberCard({ member, handleRemove, showDeleteBtn }: Props) {
    const { email, name, userId, role } = member;
    const [value, setValue] = useState<WorkspaceRole>(role);

    return (
        <div className="card bg-base-100 flex flex-row items-center justify-between space-x-3 px-4 py-3 w-full">
            <div className="flex flex-row items-center space-x-3">
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                        <span>{name ? name.charAt(0) : email?.charAt(0)}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    {name && (
                        <span className="font-semibold text-md">{name}</span>
                    )}
                    <span className="text-base">{email}</span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <Dropdown
                    disabled={value === "owner"}
                    options={accessOptions}
                    value={value}
                    onChange={(v) => setValue(v as WorkspaceRole)}
                />
                {showDeleteBtn && role !== "owner" && (
                    <button
                        onClick={() =>
                            handleRemove && handleRemove(member.userId)
                        }
                        className="btn btn-error"
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
}

export default MemberCard;
