import React, { useState, useEffect, useCallback, useContext } from 'react'
import PageLayout from '../../components/page-layout'
import styles from './index.module.css'
import { useParams, useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import PostExplore from '../../components/postExplore'

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({ email: '', username: '', profilePicture: '', followers: [], following: [] })
    const [posts, setPosts] = useState([])
    const context = useContext(UserContext)
    const params = useParams()
    const history = useHistory()

    const logOut = () => {
        context.logOut()
        history.push('/')
    }

    const getData = useCallback(async () => {
        const response = await fetch(`http://localhost:3333/api/user?id=${params.id}`)

        if (!response.ok) {
            history.push('/error')
        } else {
            const [user] = await response.json()
            setUserInfo({ ...user })
            const promise = await fetch('http://localhost:3333/api/post')
            const posts = await promise.json()
            setPosts(posts)
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
        return posts.map(post => {
            return (
                <PostExplore key={post._id} {...post} />
            )
        })
    }

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <PageLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <img className={styles.profilePic} onClick={openWidget} alt="Profile" src={userInfo.profilePicture}></img>
                    </div>
                    <section className={styles.section}>
                        <div>
                            <h2>{userInfo.username}</h2>
                            <button >Edit Profile</button>
                            <button onClick={logOut}>Logout</button>
                        </div>
                        <ul>
                            <li><strong>{posts.length}</strong> posts</li>
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