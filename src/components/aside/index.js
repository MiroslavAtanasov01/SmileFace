import React, { useCallback, useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import getCookie from '../../utils/getCookie'
import UserContext from '../../Context'
import dataService from '../../services/dataService'

const Aside = () => {
    const [users, setUsers] = useState([])
    const [userInfo, setUserInfo] = useState({ email: '', username: '', profilePicture: '', followers: [], following: [], posts: [] })
    const context = useContext(UserContext)
    const history = useHistory()

    const getData = useCallback(async () => {
        if (context.loggedIn === true) {
            const promiseUsers = await dataService({ method: 'GET', url: `/user/getNotFollowedUsers`, token: getCookie('auth-token') })
            const users = await promiseUsers.json()
            setUsers(users)
        }

        if (context.user !== null) {
            const responseUser = await dataService({ method: 'GET', url: `/user/${context.user.id}` })
            const userToRender = await responseUser.json()
            setUserInfo({ ...userToRender })
        }

    }, [context])

    const goToProfile = () => {
        history.push(`/profile/${context.user.id}`)
    }

    const goToProfileUser = (id) => {
        history.push(`/profile/${id}`)
    }

    const Follow = async (id) => {
        const userId = context.user.id
        await dataService({ method: 'PUT', url: `/user/follow/${id}`, data: { userId }, token: getCookie('auth-token') })
    }

    const renderUsers = () => {
        return users
            .slice(0, 5)
            .map(user => {
                return (
                    <div className={styles.users} key={user._id}>
                        <div onClick={() => goToProfileUser(user._id)} >
                            <img alt="" src={user.profilePicture} />
                            <div>  <span >{user.username}</span></div>
                        </div>
                        <button onClick={() => Follow(user._id)}>Follow</button>
                    </div>
                )
            })
    }

    useEffect(() => {
        getData()
    }, [getData, userInfo])

    return (
        <div className={styles.aside}>
            {userInfo.profilePicture
                ? <div>
                    <div className={styles.profile}>
                        <img onClick={goToProfile} alt="" src={userInfo.profilePicture} />
                        <span onClick={goToProfile}>{userInfo.username}</span>
                    </div>
                    <div className={styles['aside-title']}>
                        <span>Suggestions For You</span>
                    </div>
                    <div>
                        {renderUsers()}
                    </div>
                </div>
                : <div></div>
            }
        </div>
    )
}

export default Aside