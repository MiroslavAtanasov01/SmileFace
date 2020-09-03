import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './Context'
import Main from './components/main'
import LoginPage from './pages/login'

const Navigation = () => {
    const context = useContext(UserContext)
    const loggedIn = context.loggedIn

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Main />
                    {/* {loggedIn ? (<Main />) : (<Redirect to="/login" />)} */}
                </Route>
                <Route path="/login"  >
                    {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation