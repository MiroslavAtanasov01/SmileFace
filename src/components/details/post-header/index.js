import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import getCookie from '../../../utils/getCookie'
import dataService from "../../../services/dataService"
import { useParams, useHistory } from 'react-router-dom'

const PostHeader = ({ userInfo, user }) => {
    const params = useParams()
    const history = useHistory()

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

    const Follow = async () => {
        const id = user.id
        await dataService({
            method: 'PUT', url: `/user/follow/${userInfo.postedBy._id}`, data: { id }, token: getCookie('auth-token')
        })
    }

    const UnFollow = async () => {
        const id = user.id
        await dataService({
            method: 'PUT', url: `/user/unFollow/${userInfo.postedBy._id}`, data: { id }, token: getCookie('auth-token')
        })
    }

    return (
        <header className={styles.header}>
            <div className={styles.profile}>
                <Link to={`/profile/${userInfo.postedBy._id}`}>
                    <img className={styles.avatar} alt="" src={userInfo.postedBy.profilePicture} />
                </Link>
                <div>
                    <Link to={`/profile/${userInfo.postedBy._id}`} className={styles.username}>
                        {userInfo.postedBy.username}
                    </Link>
                    <div className={styles.location}>{userInfo.location}</div>
                </div>
            </div>

            {user._id === userInfo.postedBy._id
                ? <div>
                    <button onClick={EditPost}>Edit Post</button>
                    {/* <button onClick={DeletePost}>Delete Post</button> */}
                </div>
                : <div>
                    {GetFollowers()
                        ? <div><button className={styles.followBtn} onClick={UnFollow}>Unfollow</button></div>
                        : <div><button className={styles.followBtn} onClick={Follow}>Follow</button></div>}
                </div>
            }
        </header>
    )
}

export default PostHeader