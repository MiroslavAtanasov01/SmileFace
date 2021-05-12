import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import PageTitle from '../../components/helmet'
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import Input from '../../components/input'
import { Link } from 'react-router-dom'
import getCookie from '../../utils/getCookie'
import { rePasswordValidator, passwordValidator, oldPasswordValidator } from '../../utils/registerValidators'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dataService from '../../services/dataService'

const ChangePassword = () => {
    const context = useContext(UserContext)
    const history = useHistory()
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [oldPasswordError, setOldPasswordError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [rePasswordError, setrePasswordError] = useState('')

    const changePassword = async (e) => {
        e.preventDefault()

        if (password && rePassword && password === rePassword && passwordError === "" && rePasswordError === "") {

            try {
                const promise = await dataService({
                    method: 'PUT', url: `/user/changePassword`, data: {
                        oldPassword, password, repeatPassword: rePassword
                    }, token: getCookie('auth-token')
                })

                const response = await promise.json()

                if (!response.error) {
                    context.logOut()
                    history.push("/login")
                } else {
                    toast.error(response.error)
                }
            } catch (err) {
                return err
            }
        } else {
            toast.error('Please enter valid credentials')
        }
    }

    const handlerBlurOldPassword = () => { setOldPasswordError(oldPasswordValidator(oldPassword)) }
    const handlerBlurPassword = () => { setPasswordError(passwordValidator(password)) }
    const handlerBlurRePassword = () => { setrePasswordError(rePasswordValidator(password, rePassword)) }

    return (
        <div>
            <PageLayout>
                <PageTitle title="Change Password | SmileFace" />
                <ToastContainer transition={Zoom} />
                <div className={styles.container}>
                    <div className={styles["form-container"]}>
                        <div className={styles.logo}>
                            <Link to='/'>SmileFace</Link>
                        </div>
                        <form className={styles.form}>
                            <Input
                                name='password'
                                value={oldPassword}
                                onChange={(event) => setOldPassword(event.target.value)}
                                onBlur={handlerBlurOldPassword}
                                id="oldPassword"
                                type='login'
                                placeholder="Old-Password"
                                error={oldPasswordError}
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
                            <button onClick={changePassword} className={styles.btn}>Change password</button>
                        </form>
                    </div>
                </div>
            </PageLayout>
        </div>
    )
}

export default ChangePassword;