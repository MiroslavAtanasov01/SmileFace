import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import styles from './index.module.css'
import Input from '../../components/input'
import Button from '../../components/button'
import Link from '../../components/link'
import Footer from '../../components/footer'
import PageTitle from '../../components/helmet'
import { passwordValidator, emailValidator } from '../../utils/loginValidator'

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
                const promise = await fetch('http://localhost:3333/api/user/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { 'Content-type': 'application/json' }
                })
                const authToken = promise.headers.get('Authorization')
                document.cookie = `auth-token=${authToken}`

                const response = await promise.json()
                console.log(response.error)


                if (response.email && authToken) {
                    context.logIn({
                        email: response.email,
                        id: response._id
                    })
                    history.push(`/`)
                } else {
                    history.push('/login')
                }
            } catch (e) {
                console.log('Invalid user e-mail or password!')
            }
        } else {
            console.log('Please enter valid credentials')
        }

    }

    const handlerBlurEmail = () => { setEmailError(emailValidator(email)) }
    const handlerBlurPassword = () => { setPasswordError(passwordValidator(password)) }

    return (
        <div>
            <PageTitle title="Login | SmileFace" />
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
                            <div className={styles.or}>
                                <div className={styles['or-text']}>or</div>
                                <div className={styles.line}></div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <Button type='facebook' title="Log in with Facebook" />
                    </div>
                </div>
                <div className={styles.acc}>
                    <div className={styles.text}>
                        <span>Don't have an account?
                    <Link key='Sign up' to="/register" title='Sign up' type='login' />
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginPage