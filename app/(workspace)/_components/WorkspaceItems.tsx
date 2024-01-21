"use client";

import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import React from "react";

type Props = {};

function WorkspaceItems({}: Props) {
  const { workspaces } = useAppSelector((state) => state.workspace);

  return (
    <ul>
      {workspaces.map((w) => (
        <li key={w._id} className="">
          <Link href={w.slug}>
            {w.name}
            {w.subscription === "free" && (
              <span className="badge badge-sm badge-accent badge-outline">
                free
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default WorkspaceItems;
