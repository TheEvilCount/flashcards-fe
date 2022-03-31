export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL;

export const pathConsts =
{
    home: "/",
    about: "/about",

    login: "/login",
    register: "/register",
    verify: "/verify",
    resetPass: "/reset",
    lostPass: "/lost",

    settings: "/settings",
    profile: "/profile",

    notfound: "/404",
    allOthers: "*",

    dashboard: "/dashboard",
    adminDashboard: "/admin",

    /* collections: "/collections", */
    collections: "/collections/:type",

    collectionsMy: "/collections/my",
    collectionsExplore: "/collections/explore",
    collectionsTop: "/collections/top",
    collectionsFav: "/collections/favourite",


    collectionDetail: "/collections/:type/:id/cards",
    collectionPlay: "/collections/:type/:id/play",
    cardDetail: "/collections/:type/:id/cards/:cardId",
};