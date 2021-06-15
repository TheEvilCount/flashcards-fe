import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../components/home/Home";
import PageNotFound from "../components/404/PageNotFound";
import Dashboard from "../components/dashboard/Dashboard";

import { pathConsts } from "./paths"

const routes = [
    {
        key: "home",
        path: pathConsts.home,
        comp: Home,
        isPrivate: false,
        title: "Home"
    },
    {
        key: "dash",
        path: pathConsts.dashboard,
        comp: Dashboard,
        isPrivate: true,
        title: 'Dashboard'
    },
    {
        key: "login",
        path: pathConsts.login,
        comp: Login,
        isPrivate: false,
        title: "Login"
    },
    {
        key: "reg",
        path: pathConsts.register,
        comp: Register,
        isPrivate: false,
        title: "Register"
    },
    {
        key: "pgnf",
        path: "/*",
        comp: PageNotFound,
        isPrivate: false,
        title: null
    }
]
export default routes;