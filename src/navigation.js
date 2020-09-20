import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './Context'
import Main from './components/main'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import AddPost from './pages/add-post'
import Explore from './pages/explore'
import ErrorPage from './pages/error'

const Navigation = () => {
    const context = useContext(UserContext)
    const loggedIn = context.loggedIn

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact> <Main /> </Route>
                <Route path="/login"  >
                    {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
                </Route>
                <Route path="/register"  >
                    {loggedIn ? (<Redirect to="/" />) : (<RegisterPage />)}
                </Route>
                <Route path="/add-post"><AddPost /> </Route>
                <Route path="/explore"><Explore /> </Route>
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation