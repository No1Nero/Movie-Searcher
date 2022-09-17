import { createAction } from "@reduxjs/toolkit";

const registerSuccess = createAction('auth/registerSuccess');

const loginSuccess = createAction('auth/loginSuccess');

const logoutSuccess = createAction('auth/logoutSuccess');

const authActions = {
    registerSuccess,
    loginSuccess,
    logoutSuccess,
};

export default authActions;