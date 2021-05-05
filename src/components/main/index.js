import React, { useCallback, useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import Post from '../post'
import Header from '../header'
import Footer from '../footer'
import getCookie from '../../utils/getCookie'
import UserContext from '../../Context'
import Spinner from '../loading-spinner'

const Main = () => {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [userInfo, setUserInfo] = useState({ email: '', username: '', profilePicture: '', followers: [], following: [], posts: [] })
    const context = useContext(UserContext)
    const history = useHistory()

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

            const promiseUsers = await fetch('http://localhost:3333/api/user/getNotFollowedUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('auth-token')
                }
            }
            )
            const users = await promiseUsers.json()
            setUsers(users)
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

    const onClick = () => {
        history.push(`/profile/${context.user.id}`)
    }

    const onClickUsers = (id) => {
        history.push(`/profile/${id}`)
    }

    const Follow = (id) => {
        const userId = context.user.id
        fetch(`http://localhost:3333/api/user/follow/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('auth-token')
            },
            body: JSON.stringify({ userId })
        })
    }

    const renderUsers = () => {
        return users
            .slice(0, 5)
            .map(user => {
                return (
                    <div className={styles.users} key={user._id}>
                        <div onClick={() => onClickUsers(user._id)} >
                            <img alt="" src={user.profilePicture} className={styles.userPic} />
                            <span >{user.username}</span>
                        </div>
                        <button className={styles.btn} onClick={() => Follow(user._id)}>Follow</button>
                    </div>
                )
            })
    }

    useEffect(() => {
        getData()
    }, [getData, userInfo])

    return (
        <div>
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
                    </div> :
                        <Spinner />
                    }

                </div>
                <div className={styles.aside}>
                    {userInfo.profilePicture
                        ? <div>
                            <div className={styles.profile}>
                                <img alt="" src={userInfo.profilePicture} className={styles.profilePic} />
                                <span onClick={onClick}>{userInfo.username}</span>
                            </div>
                            <div className={styles['aside-title']}>
                                <span>Suggestions For You</span>
                                {/* <button>See All</button> */}
                            </div>
                            <div className={styles.renderUsers}>
                                {renderUsers()}
                            </div>
                        </div>
                        : <div></div>
                    }

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Main