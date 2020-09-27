import React, { useState, useEffect, useCallback, useContext } from 'react'
import PageLayout from '../../components/page-layout'
import styles from './index.module.css'
import { useParams, useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import PostExplore from '../../components/postExplore'
import Spinner from '../../components/loading-spinner'

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
        const response = await fetch(`http://localhost:3333/api/user/${params.id}`)

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
            }, (error, result) => {
                if (result.event === 'success') {
                    setUserInfo({ ...userInfo, profilePicture: result.info.url })
                    const picture = result.info.url

                    fetch(`http://localhost:3333/api/user/picture/${params.id}`, {
                        method: "PUT",
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({ picture })
                    })
                }
            }).open();
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

    useEffect(() => {
        getData()
    }, [getData])

    if (userInfo.username === '') {
        return (
            <Spinner />
        )
    }

    return (
        <PageLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.profilePicDiv}>
                        <img className={styles.profilePic} onClick={openWidget} alt="Profile" src={userInfo.profilePicture}></img>
                    </div>
                    <section className={styles.section}>
                        <div>
                            <h2>{userInfo.username}</h2>
                            <button >Edit Profile</button>
                            <button onClick={logOut}>Logout</button>
                        </div>
                        <ul>
                            <li><strong>{userInfo.posts.length}</strong> posts</li>
                            <li><strong>{userInfo.followers.length}</strong> followers</li>
                            <li><strong>{userInfo.following.length}</strong> following</li>
                        </ul>
                        <div><h1>{userInfo.email}</h1></div>
                    </section>
                </header>
                <main className={styles.main}>
                    {renderPosts()}
                </main>
            </div>
        </PageLayout>
    )
}

export default ProfilePage