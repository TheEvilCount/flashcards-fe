import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../components/home/Home";
import PageNotFound from "../components/404/PageNotFound";
import Dashboard from "../components/dashboard/Dashboard";
import About from "../components/about/About";
import CollectionsPage from "../components/collection/CollectionsPage";
import VerifyPage from "../components/VerifyPage";
import { CollectionDetail } from "../components/collection/CollectionDetail";
import Profile from "../components/profile/Profile";

import { pathConsts } from "./paths";
import { useSelector } from "react-redux";

import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const routes = [
    {
        key: "home",
        path: pathConsts.home,
        comp: Home,
        isPrivate: false,
        showWhenNotLogged: true,
        show: false,
        Icon: <FlashOnIcon />,
        title: "FlashCards",
        Title: () =>
        {
            return (<> <div className="icon inner" > <FlashOnIcon /></div > <div className="title inner"> FlashCards</div></>)
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
        Icon: <PersonIcon />,
        Title: () =>
        {
            const userReducer = useSelector(state => state.auth);
            return (
                <>
                    <div className="icon inner"><PersonIcon /></div>
                    <div className="title inner">
                        Welcome, {userReducer.user.username}
                        <br />
                        <small style={{ display: "contents" }}>{userReducer.user.role === "USER" ? "User account" : "Admin account"}</small>
                    </div>
                </>
            )
        },
        class: "sidebar-profile"//"space-above space-under sidebar-profile"
    },
    {
        key: "login",
        path: pathConsts.login,
        comp: Login,
        isPrivate: false,
        showWhenNotLogged: true,
        show: true,
        Icon: <ExitToAppIcon />,
        Title: () => { return (<><div className="icon inner"><ExitToAppIcon /></div><div className="title inner">Login</div></>) },
        class: "space-above"
    },
    {
        key: "register",
        path: pathConsts.register,
        comp: Register,
        isPrivate: false,
        showWhenNotLogged: true,
        show: true,
        Icon: <PersonAddIcon />,
        Title: () => { return (<><div className="icon inner"><PersonAddIcon /></div><div className="title inner">Register</div></>) },
        class: "space-under"
    },
    {
        key: "verify",
        path: pathConsts.verify,
        comp: VerifyPage,
        isPrivate: false,
        isAdmin: false,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "dashboard",
        path: pathConsts.dashboard,
        comp: Dashboard,
        isPrivate: true,
        showWhenNotLogged: true,
        show: true,
        Icon: <DashboardIcon />,
        Title: () => { return (<><div className="icon inner"><DashboardIcon /></div><div className="title inner"> Dashboard</div></>) },
        class: ""
    },
    {
        key: "about",
        path: pathConsts.about,
        comp: About,
        isPrivate: false,
        showWhenNotLogged: true,
        show: true,
        Icon: <InfoIcon />,
        Title: () => { return (<><div className="icon inner"><InfoIcon /></div><div className="title inner"> About App</div></>) },
        class: ""
    },
    {
        key: "collectionDetail",
        path: pathConsts.collectionDetail,
        comp: CollectionDetail,
        isPrivate: true,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "collections",
        path: pathConsts.collections,
        comp: CollectionsPage,
        isPrivate: true,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "collectionsMy",
        path: pathConsts.collectionsMy,
        comp: CollectionsPage,
        isPrivate: true,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "collectionsExplore",
        path: pathConsts.collectionsExplore,
        comp: CollectionsPage,
        isPrivate: true,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "collectionsTop",
        path: pathConsts.collectionsTop,
        comp: CollectionsPage,
        isPrivate: true,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "collectionsFav",
        path: pathConsts.collectionsFav,
        comp: CollectionsPage,
        isPrivate: true,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "cardDetail",
        path: pathConsts.cardDetail,
        comp: () => { return (<div>card detail</div>) },
        isPrivate: true,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "adminDashboard",
        path: pathConsts.adminDashboard,
        comp: () => { return (<div>admin dashboard component TODO</div>) },//TODO lazy loaded?
        isPrivate: true,
        isAdmin: true,
        showWhenNotLogged: false,
        show: true,
        Icon: <AdminPanelSettingsIcon />,
        Title: () => { return (<><div className="icon inner"><AdminPanelSettingsIcon /></div><div className="title inner"> Admin Dashboard</div></>) },
        class: ""
    },
    {
        key: "pgnf",
        path: "/*",
        comp: PageNotFound,
        isPrivate: false,
        show: false,
        showWhenNotLogged: false,
        Icon: <></>,
        Title: () => { return (<div></div>) },
        class: ""
    }
]
export default routes;