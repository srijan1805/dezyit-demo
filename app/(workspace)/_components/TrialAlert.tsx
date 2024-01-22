import { FREE_TRIAL } from "@/lib/constants";
import { addDays, dateDiffInDays } from "@/lib/date-fns";
import { Workspace } from "@/types";
import Link from "next/link";
import React from "react";

type Props = {
  workspace: Workspace;
};

function TrialAlert({ workspace }: Props) {
  return (
    <div className="card w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-primary-content">
      <div className="card-body">
        <h2 className="card-title">
          {`${
            FREE_TRIAL -
            dateDiffInDays(new Date(workspace.createdAt), new Date())
          } Days left`}
        </h2>
        <p>
          You have 14 days of free Edit access on this workspace. Go premium for
          a smooth Sprint Experience.
        </p>
        <div className="card-actions">
          <Link href={`/payment?workspaceId=${workspace._id}`} className="btn">
            Buy Premium
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrialAlert;
