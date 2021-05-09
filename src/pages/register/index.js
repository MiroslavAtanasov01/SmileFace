import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import styles from './index.module.css'
import Input from '../../components/input'
import Button from '../../components/button'
import { Link } from 'react-router-dom'
import Footer from '../../components/footer'
import PageTitle from '../../components/helmet'
import { rePasswordValidator, passwordValidator, usernameValidator, emailValidator } from '../../utils/registerValidators'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dataService from '../../services/dataService'

const LoginPage = () => {
    const history = useHistory()
    const context = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [rePasswordError, setrePasswordError] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        if (email && username && password && rePassword && password === rePassword
            && emailError === "" && usernameError === "" && passwordError === "" && rePasswordError === "") {

            try {
                const promise = await dataService({ method: 'POST', url: '/user/register', data: { email, username, password, rePassword } })

                const authToken = promise.headers.get('Authorization')
                document.cookie = `auth-token=${authToken}`

                const response = await promise.json()

                if (response.email && authToken) {
                    context.logIn({
                        email: response.email,
                        id: response._id
                    })
                    history.push(`/`)
                } else {
                    toast.error(response.error)
                }
            } catch (e) {
                toast.error('This email is already taken')
            }
        } else {
            toast.error('Please enter valid credentials')
        }
    }

    const handlerBlurEmail = () => { setEmailError(emailValidator(email)) }
    const handlerBlurUsername = () => { setUsernameError(usernameValidator(username)) }
    const handlerBlurPassword = () => { setPasswordError(passwordValidator(password)) }
    const handlerBlurRePassword = () => { setrePasswordError(rePasswordValidator(password, rePassword)) }

    return (
        <div>
            <PageTitle title="Register | SmileFace" />
            <ToastContainer transition={Zoom} />
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1 className={styles['logo-name']}>SmileFace</h1>
                    <div>
                        <form onSubmit={onSubmit}>
                            <Input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                onBlur={handlerBlurEmail}
                                id="email"
                                type='login'
                                placeholder="Enter your email"
                                error={emailError}
                            />
                            <Input
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                onBlur={handlerBlurUsername}
                                id="username"
                                type='login'
                                placeholder="Username"
                                error={usernameError}
                            />
                            <Input
                                name='password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onBlur={handlerBlurPassword}
                                id="password"
                                type='login'
                                placeholder="Password"
                                error={passwordError}
                            />
                            <Input
                                name='password'
                                value={rePassword}
                                onChange={(event) => setRePassword(event.target.value)}
                                onBlur={handlerBlurRePassword}
                                id="rePassword"
                                type='login'
                                placeholder="Re-Password"
                                error={rePasswordError}
                            />
                            <Button type='login' title="Register" />
                        </form>
                    </div>
                </div>
                <div className={styles.acc}>
                    <div className={styles.text}>
                        <span>Have an account?
                        <Link to="/login"> Sign in</Link>
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginPage