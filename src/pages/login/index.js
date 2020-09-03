import React, { useState, useEffect } from 'react'
import style from './index.module.css'
import Input from '../../components/input'
import Button from '../../components/button'

const LoginPage = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <div className={style.container}>
            <div className={style.main}>
                <h1 className={style.h1}>
                    SmileFace
                </h1>
                <div>
                    <form>
                        <Input
                            value={email}
                            // onChange={(e) => this.onChange(e, 'email')}
                            // onBlur={this.handlerBlurEmail}
                            // label="Email"
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
                            // label="Password"
                            id="password"
                            type='login'
                            placeholder="Password"
                        // error={passwordError}
                        />
                        <Button />
                        <div className={style.div}>
                            <div className={style.div1}></div>
                            <div className={style.div2}>or</div>
                            <div className={style.div1}></div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={style.acc}>
                <div className={style.name}>
                    <p>
                        Don't have an account?
                </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage