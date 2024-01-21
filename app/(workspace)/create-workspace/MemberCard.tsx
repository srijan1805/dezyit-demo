"use client";

import Dropdown from "@/components/ui/Dropdown";
import { accessOptions } from "@/lib/constants";
import { WorkspaceRole } from "@/types";
import React, { useState } from "react";

type Props = {
  email?: string;
  name?: string;
  role?: WorkspaceRole;
};

function MemberCard({
  email = "example@dezyit.com",
  name = "User",
  role = "view",
}: Props) {
  const [value, setValue] = useState<string>(role);

  return (
    <div className="card bg-base-100 flex flex-row items-center justify-between space-x-3 px-4 py-3 w-full">
      <div className="flex flex-row items-center space-x-3">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-12">
            <span>{email.charAt(0)}</span>
          </div>
        </div>
        <div className="flex flex-col">
          {/* <span className="font-semibold text-md">{name}</span> */}
          <span className="text-base">{email}</span>
        </div>
      </div>
      <Dropdown
        options={accessOptions}
        value={value}
        onChange={(v) => setValue(v)}
      />
    </div>
  );
}

export default MemberCard;
