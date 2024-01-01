import { createReducer, createAction } from "@reduxjs/toolkit";

// Register User Action
const registerUserRequest = createAction('registerUserRequest');
const registerUserSuccess = createAction('registerUserSuccess');
const registerUserFailure = createAction('registerUserFailure');
// Verify User Action
const verifyUserRequest = createAction('verifyUserRequest');
const verifyUserSuccess = createAction('verifyUserSuccess');
const verifyUserFailure = createAction('verifyUserFailure');
// Login User Action
const loginRequest = createAction('loginRequest');
const loginSuccess = createAction('loginSuccess');
const loginFailure = createAction('loginFailure');
// Logout User Action
const logoutRequest = createAction('logoutRequest');
const logoutSuccess = createAction('logoutSuccess');
const logoutFailure = createAction('logoutFailure');
// Get/Load User Action
const loadUserRequest = createAction('loadUserRequest');
const loadUserSuccess = createAction('loadUserSuccess');
const loadUserFailure = createAction('loadUserFailure');
// Forgot Password Action
const forgotPasswordRequest = createAction('forgotPasswordRequest');
const forgotPasswordSuccess = createAction('forgotPasswordSuccess');
const forgotPasswordFailure = createAction('forgotPasswordFailure');
// Reset Password Action
const resetPasswordRequest = createAction('resetPasswordRequest');
const resetPasswordSuccess = createAction('resetPasswordSuccess');
const resetPasswordFailure = createAction('resetPasswordFailure');
// Add Task Action
const addTaskRequest = createAction('addTaskRequest');
const addTaskSuccess = createAction('addTaskSuccess');
const addTaskFailure = createAction('addTaskFailure');
// Update Task Action
const updateTaskRequest = createAction('updateTaskRequest');
const updateTaskSuccess = createAction('updateTaskSuccess');
const updateTaskFailure = createAction('updateTaskFailure');
// Delete Task Action
const deleteTaskRequest = createAction('deleteTaskRequest');
const deleteTaskSuccess = createAction('deleteTaskSuccess');
const deleteTaskFailure = createAction('deleteTaskFailure');
// Update User Profile Action
const updateProfileRequest = createAction('updateProfileRequest');
const updateProfileSuccess = createAction('updateProfileSuccess');
const updateProfileFailure = createAction('updateProfileFailure');
// Update User Password Action
const updatePasswordRequest = createAction('updatePasswordRequest');
const updatePasswordSuccess = createAction('updatePasswordSuccess');
const updatePasswordFailure = createAction('updatePasswordFailure');
// Clear Actions
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const authReducer = createReducer({}, (builder) => {
    builder
        // Register User Reducer
        .addCase(registerUserRequest, (state) => {
            state.loading = true;
        })
        .addCase(registerUserSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase(registerUserFailure, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        // Verify User Reducer
        .addCase(verifyUserRequest, (state) => {
            state.loading = true;
        })
        .addCase(verifyUserSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase(verifyUserFailure, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        // Login User Reducer
        .addCase(loginRequest, (state) => {
            state.loading = true;
        })
        .addCase(loginSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase(loginFailure, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        // Get Or Load User Reducer
        .addCase(loadUserRequest, (state) => {
            state.loading = true;
        })
        .addCase(loadUserSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase(loadUserFailure, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        // Logout User Reducer
        .addCase(logoutRequest, (state) => {
            state.loading = true;
        })
        .addCase(logoutSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload.message;
        })
        .addCase(logoutFailure, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        })
        // Clear Reducers
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })
});

export const passwordReducer = createReducer({}, (builder) => {
    builder
        // Forgot Password Reducer
        .addCase(forgotPasswordRequest, (state) => {
            state.loading = true;
        })
        .addCase(forgotPasswordSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(forgotPasswordFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Reset Password Reducer
        .addCase(resetPasswordRequest, (state) => {
            state.loading = true;
        })
        .addCase(resetPasswordSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(resetPasswordFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
});

export const taskReducer = createReducer({}, (builder) => {
    builder
        // Add Task Reducer
        .addCase(addTaskRequest, (state) => {
            state.loading = true;
        })
        .addCase(addTaskSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(addTaskFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Update Task Reducer
        .addCase(updateTaskRequest, (state) => {
            state.loading = true;
        })
        .addCase(updateTaskSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(updateTaskFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Delete Task Reducer
        .addCase(deleteTaskRequest, (state) => {
            state.loading = true;
        })
        .addCase(deleteTaskSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(deleteTaskFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Clear Reducers
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })
});

export const profileReducer = createReducer({}, (builder) => {
    builder
        // Update User Profile Reducer
        .addCase(updateProfileRequest, (state) => {
            state.loading = true;
        })
        .addCase(updateProfileSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(updateProfileFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Update User Password Reducer
        .addCase(updatePasswordRequest, (state) => {
            state.loading = true;
        })
        .addCase(updatePasswordSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(updatePasswordFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Clear Reducers
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })
});