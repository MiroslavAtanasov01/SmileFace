import React, { useContext } from 'react'
import styles from './index.module.css'
import { useParams, useHistory } from 'react-router-dom'
import UserContext from '../../../Context'
import getCookie from '../../../utils/getCookie'
import dataService from '../../../services/dataService'


const Actions = ({ userInfo }) => {
    const context = useContext(UserContext)
    const params = useParams()
    const history = useHistory()

    const logOut = () => {
        context.logOut()
        history.push('/login')
    }

    const settings = () => {
        history.push(`/settings/${params.id}`)
    }

    const Follow = async () => {
        const id = context.user.id
        await dataService({
            method: 'PUT', url: `/user/follow/${params.id}`, data: { id }, token: getCookie('auth-token')
        })
    }

    const UnFollow = async () => {
        const id = context.user.id
        await dataService({
            method: 'PUT', url: `/user/unFollow/${params.id}`, data: { id }, token: getCookie('auth-token')
        })
    }

    const GetFollowers = () => {
        let result = false
        if (userInfo.followers.length > 0) {
            userInfo.followers.forEach(user => {
                if (user._id === context.user.id) {
                    result = true
                }
            })
        }
        return result
    }

    return (
        <div>
            <h2 className={styles.username}>{userInfo.username}</h2>
            {context.user.id === params.id
                ? <div>
                    <button className={styles.button} onClick={settings}>Edit Profile</button>
                    <button className={styles.button} onClick={logOut}>Logout</button>
                </div>
                : <div>
                    {GetFollowers()
                        ? <div><button className={styles.followBtn} onClick={UnFollow}>Unfollow</button></div>
                        : <div><button className={styles.followBtn} onClick={Follow}>Follow</button></div>}
                </div>}
        </div>
    )
}

export default Actions