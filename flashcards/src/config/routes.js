import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../components/home/Home";
import PageNotFound from "../components/404/PageNotFound";
import Dashboard from "../components/dashboard/Dashboard";

import { pathConsts } from "./paths";
import Profile from "../components/profile/Profile";

import { useSelector } from "react-redux";

import { FaUser, FaSdCard } from "react-icons/fa";


const routes = [
    {
        key: "home",
        path: pathConsts.home,
        comp: Home,
        isPrivate: false,
        showWhenNotLogged: true,
        show: true,
        Title: () =>
        {
            return (<div><FaSdCard /> Home</div>)
        },
        class: ""
    },
    {
        key: "dashboard",
        path: pathConsts.dashboard,
        comp: Dashboard,
        isPrivate: true,
        showWhenNotLogged: true,
        show: true,
        Title: () => { return (<div>Dashboard</div>) },
        class: ""
    },
    {
        key: "login",
        path: pathConsts.login,
        comp: Login,
        isPrivate: false,
        showWhenNotLogged: true,
        show: true,
        Title: () => { return (<div>Login</div>) },
        class: "fRight"
    },
    {
        key: "register",
        path: pathConsts.register,
        comp: Register,
        isPrivate: false,
        showWhenNotLogged: true,
        show: true,
        Title: () => { return (<div>Register</div>) },
        class: "fRight"
    },
    {
        key: "profile",
        path: pathConsts.profile,
        comp: Profile,
        isPrivate: true,
        showWhenNotLogged: false,
        show: true,
        Title: () =>
        {
            const userReducer = useSelector(state => state.auth);
            return (<div>{userReducer.user.username} <FaUser /></div>)
        },
        class: "fRight"
    },
    {
        key: "pgnf",
        path: "/*",
        comp: PageNotFound,
        isPrivate: false,
        show: false,
        showWhenNotLogged: false,
        Title: () => { return (<div></div>) },
        class: ""
    }
]
export default routes;