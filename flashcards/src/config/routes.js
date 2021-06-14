import Login from "../components/login/Login.js";
import Register from "../components/register/Register.js";
import Home from "../components/home/Home.js";
import Dashboard from "../components/dashboard/Dashboard.js";
import PageNotFound from "../components/404/PageNotFound.js";

const routes = [
    {
        path: "/",
        component: Home,
        isPrivate: false
    },
    {
        path: "/dashboard",
        component: Dashboard,
        isPrivate: true

    },
    {
        path: "login",
        component: Login,
        isPrivate: false
    },
    {
        path: "register",
        component: Register,
        isPrivate: false
    },
    {
        path: "/*",
        component: PageNotFound,
        isPrivate: false
    }
]
export default routes;