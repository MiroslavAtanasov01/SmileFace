import React, { useCallback, useState, useEffect, useContext } from 'react'
import styles from './index.module.css'
import Post from '../post'
import Header from '../header'
import getCookie from '../../utils/getCookie'
import UserContext from '../../Context'
import Spinner from '../loading-spinner'
import PageTitle from '../helmet'
import Aside from '../aside'

const Main = () => {
    const [posts, setPosts] = useState([])
    const [userInfo, setUserInfo] = useState({ email: '', username: '', profilePicture: '', followers: [], following: [], posts: [] })
    const context = useContext(UserContext)

    const getData = useCallback(async () => {
        if (context.loggedIn === true) {
            const promise = await fetch('http://localhost:3333/api/post/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('auth-token')
                }
            }
            )
            const posts = await promise.json()
            setPosts(posts)
        }

        if (context.user !== null) {
            const responseUser = await fetch(`http://localhost:3333/api/user/${context.user.id}`)
            const userToRender = await responseUser.json()
            setUserInfo({ ...userToRender })
        }

    }, [context])

    const renderPosts = () => {
        return posts.map(post => {
            return (
                <Post key={post._id} {...post} />
            )
        })
    }

    useEffect(() => {
        getData()
    }, [getData, userInfo])

    return (
        <div>
            <PageTitle title="SmileFace" />
            <Header />
            <div className={styles.main}>
                <div className={styles.posts}>
                    {userInfo.username ? <div>
                        {posts.length ? renderPosts() :
                            <div className={styles.empty}>
                                <span>Your feed seems empty!
                            Go follow someone and their posts will appear here!</span>
                            </div>
                        }
                    </div> : <Spinner />}
                </div>
                <Aside />
            </div>
        </div>
    )
}

export default Main