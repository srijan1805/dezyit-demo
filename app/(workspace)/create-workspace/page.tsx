"use client";

import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { WorkspaceMember, WorkspaceRole } from "@/types";
import { DebounceInput } from "react-debounce-input";
import Dropdown from "@/components/ui/Dropdown";
import { accessOptions } from "@/lib/constants";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/redux";
import { useSocket } from "@/components/providers/SocketProvider";

type FormType = {
  name: string;
  currentRole: WorkspaceRole;
  currentEmail: string;
};

type Member = {
  email: string;
  role: WorkspaceRole;
};

function CreateWorkspace() {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<WorkspaceRole>("edit");
  const [email, setEmail] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on("workspace_created", (data) => {
      console.log(data);
      toast.success("workspace created");
    });
  }, []);

  function handleSubmit() {
    console.log(name, members);

    if (name.length <= 0) {
      toast.warning("Please enter workspace name");
      return;
    }

    if (!socket) {
      toast.error("unable to create workspace");
      return;
    }

    socket.emit("createWorkspace", {
      name,
      members,
    });
  }

  return (
    <div className="space-y-4 card w-full max-w-xl bg-neutral">
      <div className="card-body">
        <div className="card-title">Create Workspace</div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Workspace Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Members</span>
          </div>
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

                setMembers((prev) => [
                  ...prev,
                  {
                    email,
                    role,
                  },
                ]);

                setEmail("");
                setRole("edit");
              }}
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </label>
        {members.map((member, i) => (
          <MemberCard
            role={member.role}
            email={member.email}
            key={`member-card-${i}`}
          />
        ))}
        {/* 
        <MemberCard /> */}
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className="btn btn-outline btn-primary mt-2"
        >
          Create Workspace
        </button>
      </div>
    </div>
  );
}

export default CreateWorkspace;
