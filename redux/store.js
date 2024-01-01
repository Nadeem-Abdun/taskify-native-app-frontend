import { configureStore } from "@reduxjs/toolkit";
import { authReducer, passwordReducer, profileReducer, taskReducer } from "./reducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        password: passwordReducer,
        task: taskReducer,
        profile: profileReducer
    },
});

export default store;