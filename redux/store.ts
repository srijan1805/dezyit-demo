import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "./workspace.reducer";
import sprintsReducer from "./sprints.reducer";

export const makeStore = () => {
    return configureStore({
        reducer: {
            workspace: workspaceReducer,
            sprints: sprintsReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
