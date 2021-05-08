import React, { useCallback, useState, useEffect, useContext } from "react"
import { useParams, useHistory } from 'react-router-dom'
import styles from './index.module.css'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../../Context'
import getCookie from '../../utils/getCookie'
import Spinner from '../loading-spinner'
import Button from '../button'
import PageTitle from '../helmet'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dataService from "../../services/dataService"

const DetailsPage = () => {
    const params = useParams()
    const history = useHistory()
    const context = useContext(UserContext)
    const [user, setUser] = useState(
        { _id: '', email: '', username: '', profilePicture: '', followers: [], following: [], posts: [] })
    const [userInfo, setUserInfo] = useState(
        { postedBy: '', createdAt: '', location: '', imageUrl: '', description: '', likes: [], comments: [] })
    const [comment, setComment] = useState('')

    const getData = useCallback(async () => {
        const response = await dataService({ method: 'GET', url: `/post/details/${params.id}` })

        if (!response.ok) {
            history.push('/error')
        } else {
            const post = await response.json()
            setUserInfo({ ...post })
        }

        if (context.user !== null) {
            const responseUser = await dataService({ method: 'GET', url: `/user/${context.user.id}` })

            if (!responseUser.ok) {
                history.push('/error')
            } else {
                const user = await responseUser.json()
                setUser({ ...user })
            }
        }

    }, [history, context, params.id])

    const viewProfile = () => {
        history.push(`/profile/${userInfo.postedBy._id}`)
    }

    const Follow = async () => {
        const id = user.id
        await dataService({
            method: 'PUT', url: `/user/follow/${userInfo.postedBy._id}`,
            data: { id }, token: getCookie('auth-token')
        })

    }

    const UnFollow = async () => {
        const id = user.id
        await dataService({
            method: 'PUT', url: `/user/unFollow/${userInfo.postedBy._id}`,
            data: { id }, token: getCookie('auth-token')
        })

    }

    const EditPost = () => {
        history.push(`/edit/${params.id}`)
    }

    const DeletePost = async () => {
        const id = userInfo.postedBy._id
        await dataService({
            method: 'DELETE', url: `/post/delete/${params.id}`, data: { id }, token: getCookie('auth-token')
        })
        history.push(`/profile/${userInfo.postedBy._id}`)
    }

    const GetFollowers = () => {
        let result = false
        if (userInfo.postedBy.followers !== undefined) {
            if (userInfo.postedBy.followers.length > 0) {
                userInfo.postedBy.followers.forEach(u => {
                    if (u === user._id) {
                        result = true
                    }
                })
            }
            return result
        }

    }

    const DeleteComment = (id) => {
        return async function () {
            const postId = params.id
            await dataService({
                method: 'DELETE', url: `/post/deleteComment/${id}`, data: { postId }, token: getCookie('auth-token')
            })
        }
    }

    const renderComments = () => {
        return userInfo.comments
            .map(e => {
                return (
                    <div key={e._id} className={styles.comment}>
                        {/* <strong><p>{e.postedBy}</p></strong> */}
                        <strong><p>dada</p></strong>
                        <p className={styles.com}>{e.comment}</p>
                        {user._id === e.postedBy
                            ? <span onClick={DeleteComment(e._id)}>x</span>
                            : null
                        }
                    </div>
                )
            })
    }

    const likePost = async (action) => {
        const postId = params.id
        await dataService({
            method: 'PUT', url: `/post/${action}`, data: { postId }, token: getCookie('auth-token')
        })
    }

    const isPostLiked = () => {
        let result = false
        if (userInfo.likes !== undefined) {
            if (userInfo.likes.length > 0) {
                userInfo.likes.forEach(u => {
                    if (u._id === user._id) {
                        result = true
                    }
                })
            }
            return result
        }

    }

    const AddComment = async (e) => {
        e.preventDefault()
        const postId = params.id

        try {
            if (comment && comment.length <= 200) {
                await dataService({
                    method: 'PUT', url: `/post/postComment`, data: { postId, comment }, token: getCookie('auth-token')
                })
            } else {
                toast.error('The comment should be max 200 character')
            }
            setComment('')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData()
    }, [userInfo, comment, getData])

    if (user.username === '') {
        return (
            <Spinner />
        )
    }

    return (
        <article className={styles.container}>
            <PageTitle title="SmileFace" />
            <ToastContainer transition={Zoom} />
            <div className={styles.photo}>
                <img className={styles.image} alt='post-photos' src={userInfo.imageUrl} />
            </div>
            <div className={styles.info}>
                <header className={styles.header}>
                    <Avatar alt="miro" src='static/images/avatar/1.jpg'>
                    </Avatar>
                    <button onClick={viewProfile}>
                        {userInfo.postedBy.username}
                    </button>
                    {user._id === userInfo.postedBy._id
                        ? <div>
                            <button onClick={EditPost}>Edit Post</button>
                            <button onClick={DeletePost}>Delete Post</button>
                        </div>
                        : <div>
                            {GetFollowers()
                                ? <div><button onClick={UnFollow}>Unfollow</button></div>
                                : <div><button onClick={Follow}>Follow</button></div>}
                        </div>
                    }
                </header>
                <div className={styles.description}>{userInfo.location}</div>
                <div className={styles.description}>{userInfo.description}</div>
                <div className={styles.comments}>{renderComments()}</div>
                {isPostLiked()
                    ? <button onClick={() => likePost('unlike')}>unlike</button>
                    : <button onClick={() => likePost('like')}>like</button>}
                {userInfo.likes.length
                    ? <div>
                        {userInfo.likes.length > 1
                            ? <div>{userInfo.likes.length} likes</div>
                            : <div>{userInfo.likes.length} like</div>
                        }
                    </div>
                    : <div></div>
                }
                <div>{(userInfo.createdAt).substr(0, 10)}</div>
                <form className={styles['post-comments']} onSubmit={AddComment}>
                    <div className={styles['div-textarea']}>
                        <textarea
                            value={comment}
                            className={styles['post-textarea']}
                            placeholder="Add a comment"
                            onChange={(e) => setComment(e.target.value)}>
                        </textarea>
                    </div>
                    <Button type='postComment' title="Post" disabled={comment ? false : true} />
                </form >
            </div>
        </article>
    )
}

export default DetailsPage