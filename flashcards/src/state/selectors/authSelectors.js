const selectors =
{
    isUserLoggedIn: (state) => { return state.auth.isLogged },
    getLoggedUser: (state) => { return state.auth.user }
}

export default selectors