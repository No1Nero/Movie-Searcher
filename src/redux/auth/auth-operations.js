import axios from "axios";
import authActions from "./auth-actions";

const register = credentials => async dispatch => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, credentials);
    dispatch(authActions.registerSuccess(response.data));
};

const login = credentials => async dispatch => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/sessions`, credentials);
    dispatch(authActions.loginSuccess(response.data));
};

const authOperations = {
    register,
    login,
};

export default authOperations;