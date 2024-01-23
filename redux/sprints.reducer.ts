import { Sprint, Workspace } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SprintsState = {
    [key: string]: Sprint[];
};

const initialState: SprintsState = {};

const socketSlice = createSlice({
    name: "sprints",
    initialState,
    reducers: {
        setSprints: (
            state,
            action: PayloadAction<{ workspaceId: string; sprints: Sprint[] }>
        ) => {
            state[action.payload.workspaceId] = action.payload.sprints;
        },
        addSprint: (
            state,
            action: PayloadAction<{ workspaceId: string; sprints: Sprint }>
        ) => {
            state[action.payload.workspaceId] = [
                action.payload.sprints,
                ...state[action.payload.workspaceId],
            ];
        },
    },
});

export const { setSprints, addSprint } = socketSlice.actions;

export default socketSlice.reducer;
