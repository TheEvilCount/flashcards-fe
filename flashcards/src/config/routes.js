import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../components/home/Home";
import PageNotFound from "../components/404/PageNotFound";
import Dashboard from "../components/dashboard/Dashboard";

const routes = [
    {
        path: "/",
        comp: Home,
        isPrivate: 0,
        title: "Home"
    },
    {
        path: "/dashboard",
        comp: Dashboard,
        isPrivate: 1,
        title: 'Dashboard'
    },
    {
        path: "/login",
        comp: Login,
        isPrivate: 0,
        title: "Login"
    },
    {
        path: "/register",
        comp: Register,
        isPrivate: 0,
        title: "Register"
    },
    {
        path: "/*",
        comp: PageNotFound,
        isPrivate: 0,
        title: null
    }
]
export default routes;