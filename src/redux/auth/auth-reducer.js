import { createReducer } from "@reduxjs/toolkit";
import authActions from "./auth-actions";

const initialUserState = {
    token: null,
};

const authReducer = createReducer(initialUserState, {
    [authActions.registerSuccess]: (_, { payload }) => payload,
    [authActions.loginSuccess]: (_, { payload }) => payload,
    [authActions.logoutSuccess]: () => initialUserState,
});

export default authReducer;

