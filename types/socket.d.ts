export type SuccessResponse = {
    type:
        | "sprint_list"
        | "persona_list"
        | "persona_fetched_by_id"
        | "persona_added"
        | "persona_updated"
        | "persona_deleted"
        | "workspaces_fetched"
        | "workspace_created"
        | "workspace_updated"
        | "workspace_member_added"
        | "workspace_member_removed";
    message?: string;
    response?: any;
};

export type ErrorResponse = {
    type: "error";
    message: string;
};
