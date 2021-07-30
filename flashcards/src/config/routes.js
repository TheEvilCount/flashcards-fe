import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../components/home/Home";
import PageNotFound from "../components/404/PageNotFound";
import Dashboard from "../components/dashboard/Dashboard";

import { pathConsts } from "./paths";
import Profile from "../components/profile/Profile";

import { useSelector } from "react-redux";

import { Dashboard as DashboardIcon, Person as PersonIcon, FlashOn as FlashOnIcon, ExitToApp as ExitToAppIcon, PersonAdd as PersonAddIcon, Info as InfoIcon, } from '@material-ui/icons';
import About from "../components/about/About";

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
            return (<> <div className="icon" > <FlashOnIcon /></div > <div className="title"> FlashCards</div></>)
        },
        class: ""
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
            return (
                <>
                    <div className="icon"><PersonIcon /></div>
                    <div className="title">
                        Welcome, {userReducer.user.username}
                        <br />
                        <small style={{ display: "contents" }}>{userReducer.user.role === "USER" ? "User account" : "Admin account"}</small>
                    </div>
                </>
            )
        },
        class: "space-above space-under sidebar-profile"
    },
    {
        key: "login",
        path: pathConsts.login,
        comp: Login,
        isPrivate: false,
        showWhenNotLogged: true,
        show: true,
        Title: () => { return (<><div className="icon"><ExitToAppIcon /></div><div className="title">Login</div></>) },
        class: "space-above"
    },
    {
        key: "register",
        path: pathConsts.register,
        comp: Register,
        isPrivate: false,
        showWhenNotLogged: true,
        show: true,
        Title: () => { return (<><div className="icon"><PersonAddIcon /></div><div className="title">Register</div></>) },
        class: "space-under"
    },
    {
        key: "dashboard",
        path: pathConsts.dashboard,
        comp: Dashboard,
        isPrivate: true,
        showWhenNotLogged: true,
        show: true,
        Title: () => { return (<><div className="icon"><DashboardIcon /></div><div className="title"> Dashboard</div></>) },
        class: ""
    },
    {
        key: "about",
        path: pathConsts.about,
        comp: About,
        isPrivate: false,
        showWhenNotLogged: true,
        show: true,
        Title: () => { return (<><div className="icon"><InfoIcon /></div><div className="title"> About App</div></>) },
        class: ""
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