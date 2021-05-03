import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import styles from './index.module.css'
import Input from '../../components/input'
import Button from '../../components/button'
import Link from '../../components/link'
import Footer from '../../components/footer'

const LoginPage = () => {
    const history = useHistory()
    const context = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const promise = await fetch('http://localhost:3333/api/user/register', {
                method: 'POST',
                body: JSON.stringify({ email, username, password, rePassword }),
                headers: { 'Content-type': 'application/json' }
            })
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
                history.push('/register')
            }
        } catch (e) {
            console.log('This email or username is already taken')
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1 className={styles['logo-name']}>SmileFace</h1>
                    <div>
                        <form onSubmit={onSubmit}>
                            <Input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                // onBlur={this.handlerBlurEmail}
                                id="email"
                                type='login'
                                placeholder="Enter your email"
                            />
                            <Input
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                // onBlur={this.handlerBlurEmail}
                                id="username"
                                type='login'
                                placeholder="Username"
                            />
                            <Input
                                name='password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                // onBlur={this.handlerBlurPassword}
                                id="password"
                                type='login'
                                placeholder="Password"
                            />
                            <Input
                                name='password'
                                value={rePassword}
                                onChange={(event) => setRePassword(event.target.value)}
                                // onBlur={this.handlerBlurEmail}
                                id="rePassword"
                                type='login'
                                placeholder="Re-Password"
                            />
                            <Button type='login' title="Register" />
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
                        <span>Have an account?
                    <Link
                                key='Sign in'
                                to="/login"
                                title='Sign in'
                                type='login'
                            />
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginPage