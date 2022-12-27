import axios from "axios";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";

const LOGIN_BASE_URL = "http://localhost:8080/api/auth";


export const signIn = (signIn: SignIn) => {
    return axios.post(LOGIN_BASE_URL + "/signin", signIn)
        .then(res => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${res.data.token}`}
        });
}
export const signUp = (signUp: SignUp) => {
    return axios.post(LOGIN_BASE_URL + "/signup", signUp);
}