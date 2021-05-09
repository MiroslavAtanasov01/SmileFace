import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import styles from './index.module.css'
import Input from '../../components/input'
import Button from '../../components/button'
import { Link } from 'react-router-dom'
import Footer from '../../components/footer'
import PageTitle from '../../components/helmet'
import { passwordValidator, emailValidator } from '../../utils/loginValidator'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dataService from '../../services/dataService'

const LoginPage = () => {
    const history = useHistory()
    const context = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        if (email && password && emailError === '' && passwordError === '') {
            try {
                const promise = await dataService({ method: 'POST', url: '/user/login', data: { email, password } })

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
                    toast.error('Invalid user e-mail or password!')
                }
            } catch (e) {
                console.error(e)
            }
        } else {
            toast.error('Please enter valid credentials')
        }

    }

    const handlerBlurEmail = () => { setEmailError(emailValidator(email)) }
    const handlerBlurPassword = () => { setPasswordError(passwordValidator(password)) }

    return (
        <div>
            <PageTitle title="Login | SmileFace" />
            <ToastContainer transition={Zoom} />
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1 className={styles['logo-name']}>
                        SmileFace
                </h1>
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
                                name='password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onBlur={handlerBlurPassword}
                                id="password"
                                type='login'
                                placeholder="Password"
                                error={passwordError}
                            />
                            <Button type='login' title="Log in" />
                        </form>
                    </div>
                </div>
                <div className={styles.acc}>
                    <div className={styles.text}>
                        <span>Don't have an account?
                    <Link to="/register"> Sign up</Link>
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginPage
