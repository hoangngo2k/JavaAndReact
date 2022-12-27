import {Route, Routes} from "react-router-dom";
import SignIn from "./signin/sign-in";
import SignUp from "./signup/sign-up";

const LoginRoutes = () => {
    return (
        <Routes>
            <Route index element={<SignIn/>}/>
            <Route path={"/signin"} element={<SignIn />}/>
            <Route path={"/signup"} element={<SignUp />}/>
        </Routes>
    )
}

export default LoginRoutes;