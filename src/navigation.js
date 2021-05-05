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
import ProfilePage from './pages/profile-page'
import SettingsProfile from './pages/settingsProfile'
import DetailsPage from './components/details'
import Edit from './components/post/edit'
import ChangePassword from './pages/changePassword'

const Navigation = () => {
    const context = useContext(UserContext)
    const loggedIn = context.loggedIn

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    {loggedIn ? (<Main />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/login"  >
                    {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
                </Route>
                <Route path="/register"  >
                    {loggedIn ? (<Redirect to="/" />) : (<RegisterPage />)}
                </Route>
                <Route path="/profile/:id">
                    {loggedIn ? (<ProfilePage />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/add-post">
                    {loggedIn ? (<AddPost />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/explore">
                    {loggedIn ? (<Explore />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/details/:id">
                    {loggedIn ? (<DetailsPage />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/edit/:id">
                    {loggedIn ? (<Edit />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/settings/:id">
                    {loggedIn ? (<SettingsProfile />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/changePassword">
                    {loggedIn ? (<ChangePassword />) : (<Redirect to="/login" />)}
                </Route>
                <Route >
                    {loggedIn ? (<ErrorPage />) : (<Redirect to="/login" />)}
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation