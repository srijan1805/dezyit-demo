"use client";

import React, { useState } from "react";
import MemberCard from "../_components/MemberCard";
import { WorkspaceMember, WorkspaceRole } from "@/types";
import { toast } from "react-toastify";
import { useSocket } from "@/components/providers/SocketProvider";
import AddMember from "../_components/AddMember";

type FormType = {
  name: string;
  currentRole: WorkspaceRole;
  currentEmail: string;
};

function CreateWorkspace() {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<WorkspaceRole>("edit");
  const [email, setEmail] = useState<string>("");
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const { socket } = useSocket();
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    console.log(name, members);

    if (name.length <= 0) {
      toast.warning("Workspace name is required!");
      return;
    }

    if (!socket) {
      toast.error("unable to create websocket connection!");
      return;
    }

    setLoading(true);
    socket.emit("createWorkspace", {
      name,
      members,
    });

    setName("");
    setEmail("");
    setRole("edit");
    setMembers([]);
    setLoading(false);
  }

  function handleAddMember(newMember: WorkspaceMember) {
    setMembers((prev) => [...prev, newMember]);
    setEmail("");
    setRole("edit");
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
            autoFocus
          />
        </label>
        <AddMember
          email={email}
          setEmail={setEmail}
          role={role}
          setRole={setRole}
          handleAddMember={handleAddMember}
        />
        {members.map((member, i) => (
          <MemberCard
            member={member}
            key={`member-card-${member.userId}-${i}`}
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
