"use client";

import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import React from "react";

type Props = {
    handleClose?: () => void;
};

function WorkspaceItems({ handleClose }: Props) {
    const { workspaces } = useAppSelector((state) => state.workspace);

    return (
        <ul>
            {workspaces.map((w) => (
                <li key={w._id} className="">
                    <Link
                        onClick={() => handleClose?.()}
                        replace
                        href={`/${w.slug}`}
                    >
                        {w.name}
                        {w.subscriptionStatus === "pro" && (
                            <span className="badge badge-sm badge-warning text-xs">
                                pro
                            </span>
                        )}
                        {w.subscriptionStatus === "free" && (
                            <span className="badge badge-sm badge-accent badge-outline text-xs">
                                free
                            </span>
                        )}
                        {w.subscriptionStatus === "subscription-expired" && (
                            <span className="badge badge-sm badge-accent badge-outline text-xs capitalize">
                                subscription expired
                            </span>
                        )}
                        {w.subscriptionStatus === "free-trial-expired" && (
                            <span className="badge badge-sm badge-accent badge-outline text-xs capitalize">
                                free trial expired
                            </span>
                        )}
                        {w.subscriptionStatus === "payment-due" && (
                            <span className="badge badge-sm badge-accent badge-outline text-xs capitalize">
                                payment due
                            </span>
                        )}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default WorkspaceItems;
