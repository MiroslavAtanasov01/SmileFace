import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import PageTitle from '../../components/helmet'
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import Input2 from '../../components/input2'
import { Link } from 'react-router-dom'
import getCookie from '../../utils/getCookie'

const ChangePassword = () => {
    const context = useContext(UserContext)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const history = useHistory()

    const changePassword = async (e) => {
        e.preventDefault()

        try {
            const promise = await fetch("http://localhost:3333/api/user/changePassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': getCookie('auth-token')
                },
                body: JSON.stringify({ oldPassword, password, repeatPassword: rePassword })
            })

            const response = await promise.json()
            console.log(response)

            if (response.error) {
                console.err(response.error)
            } else {
                context.logOut()
                history.push("/login")
            }
        } catch (err) {
            console.log('error')
        }
    }

    return (
        <div>
            <PageLayout>
                <PageTitle title="Change Password | SmileFace" />
                <div className={styles.container}>
                    <div className={styles["form-container"]}>
                        <div className={styles.logo}>
                            <Link to='/'>SmileFace</Link>
                        </div>
                        <form className={styles.form}>
                            <Input2 type="password" placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
                            <Input2 type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <Input2 type="password" placeholder="Repeat Password" onChange={(e) => setRePassword(e.target.value)} />
                            <button onClick={changePassword} className={styles.btn}>Change password</button>
                        </form>
                    </div>
                </div>
            </PageLayout>
        </div>
    )
}

export default ChangePassword;