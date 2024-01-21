export type WorkspaceRole = "owner" | "admin" | "edit" | "view";

export type WorkspaceMember = {
  _id: Types.ObjectId;
  role: WorkspaceRole;
  addedAt: NativeDate;
};

export type Workspace = {
  _id: string;
  name: string;
  slug: string;
  ownerId: string;
  members: WorkspaceMember[];
  subscription: "paid" | "free" | "cancelled" | "payment-due";
  lastBilling: string | null;
  createdAt: Date;
  updatedAt: Date;
};
