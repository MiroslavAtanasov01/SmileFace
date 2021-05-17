import React, { useCallback, useState, useEffect, useContext } from 'react'
import styles from './index.module.css'
import Post from '../post'
import Header from '../header'
import getCookie from '../../utils/getCookie'
import UserContext from '../../Context'
import Spinner from '../loading-spinner'
import PageTitle from '../helmet'
import Aside from '../aside'
import dataService from '../../services/dataService'

const Main = () => {
    const [posts, setPosts] = useState([])
    const [userInfo, setUserInfo] = useState({ email: '', username: '', profilePicture: '', followers: [], following: [], posts: [] })
    const context = useContext(UserContext)
    const [update, setUpdate] = useState('')

    const getData = useCallback(async () => {
        if (context.loggedIn === true) {
            const promise = await dataService({ method: 'GET', url: `/post/posts`, token: getCookie('auth-token') })
            const posts = await promise.json()
            setPosts(posts)
        }

        if (context.user !== null) {
            const responseUser = await dataService({ method: 'GET', url: `/user/${context.user.id}` })
            const userToRender = await responseUser.json()
            setUserInfo({ ...userToRender })
        }

    }, [context])

    const renderPosts = () => {
        return posts.map(post => {
            return (
                <Post key={post._id} {...post} setUpdate={() => setUpdate(!update)} />
            )
        })
    }

    useEffect(() => {
        getData()
    }, [update, getData])

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