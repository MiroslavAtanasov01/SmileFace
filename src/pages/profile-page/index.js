import React, { useState, useEffect, useCallback, useContext } from 'react'
import PageLayout from '../../components/page-layout'
import styles from './index.module.css'
import { useParams, useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import PostExplore from '../../components/postExplore'
import Spinner from '../../components/loading-spinner'
import getCookie from '../../utils/getCookie'
import PageTitle from '../../components/helmet'
import dataService from '../../services/dataService'

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({ email: '', username: '', profilePicture: '', followers: [], following: [], posts: [] })
    const context = useContext(UserContext)
    const params = useParams()
    const history = useHistory()

    const logOut = () => {
        context.logOut()
        history.push('/login')
    }

    const getData = useCallback(async () => {
        const response = await dataService({ method: 'GET', url: `/user/${params.id}` })

        if (!response.ok) {
            history.push('/error')
        } else {
            const user = await response.json()
            setUserInfo({ ...user })
        }
    }, [params.id, history])


    const openWidget = () => {
        window.cloudinary.createUploadWidget(
            {
                cloudName: 'dzzbxneof',
                uploadPreset: 'softuni',
            }, async (error, result) => {
                if (result.event === 'success') {
                    setUserInfo({ ...userInfo, profilePicture: result.info.url })
                    const picture = result.info.url
                    await dataService({ method: 'PUT', url: `/user/picture/${params.id}`, data: { picture } })
                }
            }).open();
    }

    const settings = () => {
        history.push(`/settings/${params.id}`)
    }

    const renderPosts = () => {
        if (userInfo.posts.length === 0) {
            return (
                <div className={styles.empty}>
                    <h1>There is no posts</h1>
                </div>
            )
        }
        return userInfo.posts.map(post => {
            return (
                <PostExplore key={post._id} {...post} />
            )
        })
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

    useEffect(() => {
        getData()
    }, [userInfo, getData])


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

    if (userInfo.username === '') {
        return (
            <Spinner />
        )
    }

    return (
        <PageLayout>
            <PageTitle title={`${userInfo.username} | SmileFace`} />
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.profilePicDiv}>
                        {context.user.id === params.id
                            ? < img className={styles.profilePic} onClick={openWidget} alt="Profile" src={userInfo.profilePicture}></img>
                            : < img className={styles.profilePic} alt="Profile" src={userInfo.profilePicture}></img>
                        }
                    </div>
                    <section className={styles.section}>
                        <div>
                            <h2>{userInfo.username}</h2>
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
                        <ul>
                            <li><strong>{userInfo.posts.length}</strong> posts</li>
                            <li><strong>{userInfo.followers.length}</strong> followers</li>
                            <li><strong>{userInfo.following.length}</strong> following</li>
                        </ul>
                        <div><h1>{userInfo.description}</h1></div>
                    </section>
                </header>
                <main className={styles.main}>
                    {renderPosts()}
                </main>
            </div>
        </PageLayout >
    )
}

export default ProfilePage