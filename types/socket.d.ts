type SuccessResponse = {
  type:
    | "persona_list"
    | "persona_fetched_by_id"
    | "persona_added"
    | "persona_updated"
    | "persona_deleted"
    | "workspaces_fetched"
    | "workspace_created"
    | "workspace_updated";
  message?: string;
  response?: any;
};
