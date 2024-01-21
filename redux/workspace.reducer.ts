import { Workspace } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WorkspaceState = {
  workspaces: Workspace[];
};

const initialState: WorkspaceState = {
  workspaces: [],
};

const socketSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaces: (state, action: PayloadAction<Workspace[]>) => {
      state.workspaces = action.payload;
    },
    addWorkspaces: (state, action: PayloadAction<Workspace>) => {
      state.workspaces = [action.payload, ...state.workspaces];
    },
  },
});

export const { setWorkspaces } = socketSlice.actions;

export default socketSlice.reducer;
