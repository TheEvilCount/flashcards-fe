import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import PageNotFoundPage from "../pages/PageNotFoundPage";
import Dashboard from "../pages/DashboardPage";
import AboutPage from "../pages/AboutPage";
import CollectionsPage from "../pages/CollectionsPage";
import VerifyPage from "../pages/VerifyPage";
import CollectionDetailPage from "../pages/CollectionDetailPage";
import Profile from "../pages/ProfilePage";

import { pathConsts } from "./paths";
import { useSelector } from "react-redux";

import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AdminPage from "pages/AdminPage";
import ResetPage from "pages/ResetPage";
import LostPassPage from "pages/LostPassPage";
import PlayPage from "pages/PlayPage";

const routes = [
    {
        key: "home",
        path: pathConsts.home,
        comp: HomePage,
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
                        <div>
                            <span>Welcome, </span><span>{userReducer.user.username}</span>
                            <small style={{ display: "contents" }}>
                                {userReducer.user.role === "USER" ? "User account" : "Admin account"}
                            </small>
                        </div>
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
        key: "reset",
        path: pathConsts.resetPass,
        comp: ResetPage,
        isPrivate: false,
        isAdmin: false,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "lost",
        path: pathConsts.lostPass,
        comp: LostPassPage,
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
        comp: AboutPage,
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
        comp: CollectionDetailPage,
        isPrivate: true,
        showWhenNotLogged: false,
        show: false,
        Icon: <></>,
        Title: () => { return (<></>) },
        class: ""
    },
    {
        key: "collectionPlay",
        path: pathConsts.collectionPlay,
        comp: PlayPage,
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
        comp: AdminPage,//TODO lazy loaded?
        isPrivate: true,
        isAdmin: true,
        showWhenNotLogged: false,
        show: true,
        Icon: <AdminPanelSettingsIcon />,
        Title: () =>
        {
            return (
                <>
                    <div className="icon inner"><AdminPanelSettingsIcon />
                    </div>
                    <div className="title inner"> Admin Page</div>
                </>
            )
        },
        class: ""
    },
    {
        key: "pgnf",
        path: "/*",
        comp: PageNotFoundPage,
        isPrivate: false,
        show: false,
        showWhenNotLogged: false,
        Icon: <></>,
        Title: () => { return (<div></div>) },
        class: ""
    }
]
export default routes;