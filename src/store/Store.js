import { configureStore } from "@reduxjs/toolkit";
import UserSlices from "../slices/UserSlices";
import TaskSlices from "../slices/TaskSlices";

export const Store = configureStore({
    reducer: {
        user: UserSlices,
        task: TaskSlices
    }
});