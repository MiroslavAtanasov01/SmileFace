import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import Input from '../../components/input'
import Button from '../../components/button'
import Link from '../../components/link'

const LoginPage = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1 className={styles['logo-name']}>
                    SmileFace
                </h1>
                <div>
                    <form>
                        <Input
                            value={email}
                            // onChange={(e) => this.onChange(e, 'email')}
                            // onBlur={this.handlerBlurEmail}
                            id="email"
                            type='login'
                            placeholder="Enter your email"
                        // error={emailError}
                        />
                        <Input
                            name='password'
                            value={password}
                            // onChange={(e) => this.onChange(e, 'password')}
                            // onBlur={this.handlerBlurPassword}
                            id="password"
                            type='login'
                            placeholder="Password"
                        // error={passwordError}
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
                    <p>Don't have an account?
                    <Link
                            key='Sign up'
                            href="/register"
                            title='Sign up'
                            type='login'
                        />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage