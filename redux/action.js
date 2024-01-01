import axios from "axios";

const serverUrl = 'https://taskify-native-app-backend.onrender.com/api/v1';

export const registerUser = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "registerUserRequest" });
        const { data } = await axios.post(
            `${serverUrl}/register`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
        dispatch({ type: "registerUserSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "registerUserFailure", payload: error.response.data.message });
    }
}

export const verifyUser = (otp) => async (dispatch) => {
    try {
        dispatch({ type: "verifyUserRequest" });
        const { data } = await axios.post(
            `${serverUrl}/verify`,
            { otp },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        dispatch({ type: "verifyUserSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "verifyUserFailure", payload: error.response.data.message });
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" });
        const { data } = await axios.post(
            `${serverUrl}/login`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        dispatch({ type: "loginSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "loginFailure", payload: error.response.data.message });
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" });
        const { data } = await axios.get(`${serverUrl}/logout`);
        dispatch({ type: "logoutSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "logoutFailure", payload: error.response.data.message });
    }
}

export const addTask = (title, description) => async (dispatch) => {
    try {
        dispatch({ type: "addTaskRequest" });
        const { data } = await axios.post(
            `${serverUrl}/addTask`,
            { title, description },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        dispatch({ type: "addTaskSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "addTaskFailure", payload: error.response.data.message });
    }
}

export const updateTask = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: "updateTaskRequest" });
        const { data } = await axios.put(
            `${serverUrl}/task/${taskId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        dispatch({ type: "updateTaskSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "updateTaskFailure", payload: error.response.data.message });
    }
}

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: "deleteTaskRequest" });
        const { data } = await axios.delete(
            `${serverUrl}/task/${taskId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        dispatch({ type: "deleteTaskSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "deleteTaskFailure", payload: error.response.data.message });
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "loadUserRequest" });
        const { data } = await axios.get(`${serverUrl}/getprofile`);
        dispatch({ type: "loadUserSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "loadUserFailure", payload: error.response.data.message });
    }
}

export const updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "updateProfileRequest" });
        const { data } = await axios.put(
            `${serverUrl}/updateprofile`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
        dispatch({ type: "updateProfileSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "updateProfileFailure", payload: error.response.data.message });
    }
}

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: "updatePasswordRequest" });
        const { data } = await axios.put(
            `${serverUrl}/updatepassword`,
            { oldPassword, newPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        dispatch({ type: "updatePasswordSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "updatePasswordFailure", payload: error.response.data.message });
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: "forgotPasswordRequest" });
        const { data } = await axios.post(
            `${serverUrl}/forgotpassword`,
            { email },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        dispatch({ type: "forgotPasswordSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "forgotPasswordFailure", payload: error.response.data.message });
    }
}

export const resetPassword = (otp, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: "resetPasswordRequest" });
        const { data } = await axios.put(
            `${serverUrl}/resetpassword`,
            { otp, newPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        dispatch({ type: "resetPasswordSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "resetPasswordFailure", payload: error.response.data.message });
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({ type: "clearError" });
}

export const clearMessage = () => async (dispatch) => {
    dispatch({ type: "clearMessage" });
}