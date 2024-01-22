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
    addWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.workspaces = [...state.workspaces, action.payload];
    },
    updateWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.workspaces = state.workspaces.map((w) =>
        w._id === action.payload._id ? action.payload : w
      );
    },
  },
});

export const { setWorkspaces, addWorkspace, updateWorkspace } =
  socketSlice.actions;

export default socketSlice.reducer;
