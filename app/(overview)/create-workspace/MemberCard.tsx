"use client";

import Dropdown, { DropdownOption } from "@/components/ui/Dropdown";
import React, { useState } from "react";

type Props = {
  email?: string;
  name?: string;
  access?: "edit" | "view" | "admin";
};

const accessOptions: DropdownOption[] = [
  {
    label: "Edit",
    value: "edit",
  },
  {
    label: "View",
    value: "view",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

function MemberCard({
  email = "example@dezyit.com",
  name = "User",
  access = "view",
}: Props) {
  const [value, setValue] = useState<string>(access);

  return (
    <div className="card bg-base-100 shadow-xl flex flex-row items-center justify-start space-x-3 px-4 py-3">
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-12">
          <span>{name.charAt(0)}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-md">{name}</span>
        <span className="text-base">{email}</span>
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
