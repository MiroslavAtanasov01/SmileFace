import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './Context'
import Main from './components/main'

const Navigation = () => {
    const context = useContext(UserContext)
    const loggedIn = context.loggedIn

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    {loggedIn ? (<Main />) : (<Redirect to="/login" />)}
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation