export type WorkspaceRole = "owner" | "admin" | "edit" | "view";

export type IBasicUserInfo = {
    userId: string;
    email: string;
    photoURL: string | null;
    name: string;
};

export type WorkspaceMember = {
    role: WorkspaceRole;
    addedAt?: Date;
} & IBasicUserInfo;

export type Workspace = {
    _id: string;
    name: string;
    slug: string;
    owner: IBasicUserInfo;
    members: WorkspaceMember[];
    subscription: "pro" | "free" | "cancelled" | "payment-due";
    lastBilling: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type IAccessType = "EDIT" | "VIEW";

export type SprintMembers = {
    access: IAccessType;
    isSprintOwner: boolean;
    _id: ObjectId;
} & IBasicUserInfo;

export type Invitation = {
    _id: Types.ObjectId | string;
    email: string;
    access: IAccessType;
};

export type Sprint = {
    _id: string;
    sprintName: string;
    sprintMaster: string;
    workspaceId: string;
    members: SprintMembers[];
    progress: number;
    sprintDuration: "1" | "3" | "5";
    currentStep: string;
    upcomingStep: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy: string;
    invitationList: Invitation[];
    completedAt: Date;
    isPublic: boolean;
    globalAccess: IAccessType;
    isDeleted: boolean;
    usersInRoom: IBasicUserInfo[];
};
