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

export type SubscriptionStatus =
    | "free"
    | "free-trial-expired"
    | "pro"
    | "subscription-paused"
    | "subscription-expired"
    | "payment-due";
export type Workspace = {
    _id: string;
    name: string;
    slug: string;
    owner: IBasicUserInfo;
    members: WorkspaceMember[];
    subscriptionStatus: SubscriptionStatus;
    lastBilling: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type IAccessType = "EDIT" | "VIEW";

export type SprintMembers = {
    access: IAccessType;
    isSprintOwner: boolean;
    _id: string;
} & IBasicUserInfo;

export type Invitation = {
    _id: string;
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

export type Billing = {
    _id: string;
    userId: string;
    workspaceId: string | null;
    subscriptionId: string;
    startDate: Date;
    endDate: Date;
    amount: number;
};
