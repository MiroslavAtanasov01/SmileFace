import React from 'react'

const UserContext = React.createContext({
    loggedIn: true,
    user: null,
    logIn: () => { },
    logOut: () => { }
})


export default UserContext 