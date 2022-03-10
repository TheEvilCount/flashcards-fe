const selectors =
{
    isUserLoggedIn: (state) => { return state.auth.isLogged },
    getLoggedUser: (state) => { return state.auth.user },
    getLoggedUserUsername: (state) => { return state.auth.user.username }
}

export default selectors