"use client";

import { useAppSelector } from "@/hooks/redux";
import { FREE_TRIAL } from "@/lib/constants";
import { addDays, dateDiffInDays } from "@/lib/date-fns";
import Link from "next/link";
import TrialAlert from "../_components/TrialAlert";

export default function WorkspacePage({
    params,
}: {
    params: { slug: string };
}) {
    const { workspaces } = useAppSelector((state) => state.workspace);

    const workspace = workspaces.find(
        (workspace) => workspace.slug === params.slug
    );

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

                    <div className="text-center">No Sprints to show</div>
                </>
            )}
        </>
    );
}
