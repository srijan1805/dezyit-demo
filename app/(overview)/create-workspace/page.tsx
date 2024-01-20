"use client";

import React from "react";
import MemberCard from "./MemberCard";
import { toast } from "react-toastify";

const members = [{}];

function CreateWorkspace() {
  return (
    <div className="space-y-4">
      <div className="text-lg">Create Workspace</div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Workspace Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Members</span>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="email"
            placeholder="Type member's email here"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-neutral">Add</button>
        </div>
      </label>
      <MemberCard />
      <MemberCard />

      <button
        onClick={() => {
          console.log("clicked");
          toast.info("toast");
        }}
        className="btn btn-outline btn-primary"
      >
        Create Workspace
      </button>
    </div>
  );
}

export default CreateWorkspace;
