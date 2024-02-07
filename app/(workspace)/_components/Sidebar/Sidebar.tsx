"use client";

import Link from "next/link";
import React from "react";
import WorkspaceItems from "./WorkspaceItems";
import { twMerge } from "tailwind-merge";
import { ArchiveIcon, Package, Plus, RotateCcw } from "lucide-react";

type Props = {
    className?: string;
    handleClose?: () => void;
};

function Sidebar({ className, handleClose }: Props) {
    return (
        <ul
            className={twMerge(
                "block menu bg-base-200 w-auto lg:w-64 xl:w-80 rounded-box h-full md:text-md capitalize space-y-1",
                className
            )}
        >
            <li onClick={() => handleClose?.()}>
                <Link href="/recent" className="whitespace-nowrap">
                    <RotateCcw className="h-5 w-5" />
                    Recent Items
                </Link>
            </li>
            <li>
                <div className="menu-title flex items-center justify-between gap-4">
                    <h2>Workspaces</h2>
                    <div className="tooltip " data-tip="Create new workspace">
                        <Link
                            onClick={() => handleClose?.()}
                            href="/create-workspace"
                            className="btn btn-sm btn-circle btn-primary"
                        >
                            <Plus className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                <WorkspaceItems handleClose={handleClose} />
            </li>
            <li onClick={() => handleClose?.()}>
                <Link href="/legacy" className="whitespace-nowrap">
                    <Package className="h-5 w-5" />
                    Legacy Sprints
                </Link>
            </li>
            <li onClick={() => handleClose?.()}>
                <Link href="/archived" className="whitespace-nowrap">
                    <ArchiveIcon className="h-5 w-5" />
                    Archived
                </Link>
            </li>
        </ul>
    );
}

export default Sidebar;
