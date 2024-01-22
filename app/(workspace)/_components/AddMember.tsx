"use client";

import Dropdown from "@/components/ui/Dropdown";
import { accessOptions } from "@/lib/constants";
import { WorkspaceMember, WorkspaceRole } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

type Props = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  role: WorkspaceRole;
  setRole: Dispatch<SetStateAction<WorkspaceRole>>;
  handleAddMember: (m: WorkspaceMember) => void;
  hideLabel?: boolean;
};

function AddMember({
  email,
  setEmail,
  role,
  setRole,
  handleAddMember,
  hideLabel = false,
}: Props) {
  return (
    <label className="form-control w-full ">
      {!hideLabel && (
        <div className="label">
          <span className="label-text">Members</span>
        </div>
      )}
      <div className="flex items-center space-x-3">
        <input
          type="email"
          placeholder="Type email"
          className="input input-bordered w-full"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Dropdown
          options={accessOptions}
          value={role}
          onChange={(v) => setRole(v as WorkspaceRole)}
        />

        <button
          onClick={() => {
            if (!email) {
              toast.error("email is required");
              return;
            }

            const id = nanoid();
            handleAddMember({
              email,
              role,
              addedAt: new Date(),
              name: "",
              photoURL: null,
              userId: id,
            });
          }}
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
    </label>
  );
}

export default AddMember;
