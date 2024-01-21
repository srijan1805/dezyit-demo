import {
  ArchiveBoxIcon,
  ClockIcon,
  PlusIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import WorkspaceItems from "./WorkspaceItems";

function Sidebar() {
  return (
    <ul className="menu bg-base-200 w-auto lg:w-64 xl:w-80 rounded-box h-full md:text-lg capitalize">
      <li>
        <Link href="/recent" className="whitespace-nowrap">
          <ClockIcon className="h-5 w-5" />
          Recent Items
        </Link>
      </li>
      <li>
        <div className="menu-title flex items-center justify-between gap-4">
          <h2>Workspaces</h2>
          <div className="tooltip " data-tip="Create new workspace">
            <Link
              href="/create-workspace"
              className="btn btn-sm btn-circle btn-primary"
            >
              <PlusIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <WorkspaceItems />
      </li>
      <li>
        <Link href="/legacy" className="whitespace-nowrap">
          <Square3Stack3DIcon className="h-5 w-5" />
          Legacy Sprints
        </Link>
      </li>
      <li>
        <Link href="/archived" className="whitespace-nowrap">
          <ArchiveBoxIcon className="h-5 w-5" />
          Archived
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
