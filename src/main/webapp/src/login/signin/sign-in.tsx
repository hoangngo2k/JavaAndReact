import React, {useState} from "react";
import {signIn} from "../login-service";
import {useNavigate} from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const getSignInInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setUser({...user, [event.target.name]: value});
    }

    const requestSignIn = () => {
        console.log(user)
        signIn(user)
            .then(res => {
                navigate("/students")
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            name={"username"}
                            placeholder="Enter username"
                            onChange={event => getSignInInput(event)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            name={"password"}
                            placeholder="Enter password"
                            onChange={event => getSignInInput(event)}
                        />
                    </div>
                    <a href="src/login/signin/sign-in#" className={"d-flex justify-content-start mt-2"}>Forgot password?</a>
                    <div className="d-grid gap-2 mt-3">
                        <button type="button" className="btn btn-primary" onClick={requestSignIn}>
                            Submit
                        </button>
                    </div>
                    <div className={"row"}>
                        <a href="/auth/signup" className={"Sign-Up"}>Sign Up</a>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignIn;