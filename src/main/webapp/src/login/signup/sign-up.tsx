import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {signUp} from "../login-service";

const SignUp = () => {

    const navigate = useNavigate();
    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        role: ['user']
    });
    const [rePassword, setPassword] = useState('');

    const getSignUpInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setRegister({...register, [event.target.name]: value});
    }

    const getReEnterPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const requestSignUp = () => {
        signUp(register)
            .then(() => navigate("/auth/signin"))
            .catch(error => console.log(error));
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form was-validated" onSubmit={requestSignUp}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="form-group mt-3">
                        <label>Username *</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            name={"username"}
                            onChange={event => getSignUpInput(event)}
                            required={true}
                        />
                        <div className="valid-feedback"></div>
                        <div className="invalid-feedback"></div>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email *</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            name={"email"}
                            onChange={event => getSignUpInput(event)}
                            required={true}
                        />
                        <div className="valid-feedback"></div>
                        <div className="invalid-feedback"></div>
                    </div>
                    <div className="form-group mt-3">
                        <label>Password *</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            name={"password"}
                            onChange={event => getSignUpInput(event)}
                            required={true}
                        />
                        <div className="valid-feedback"></div>
                        <div className="invalid-feedback"></div>
                    </div>
                    <div className="form-group mt-3">
                        <label>Re-enter Password *</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            name={"re_enter_password"}
                            onChange={event => getReEnterPassword(event)}
                            required={true}
                        />
                        <div className="valid-feedback"></div>
                        <div className="invalid-feedback"></div>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <div className="Sign-Up">
                        Already registered?
                        <a href="/auth/signin" className={"ms-2"}>Sign In</a>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp;