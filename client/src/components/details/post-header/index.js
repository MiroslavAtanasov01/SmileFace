import React, { useState } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import getCookie from '../../../utils/getCookie'
import dataService from "../../../services/dataService"
import PostMenu from '../post-menu'

const PostHeader = ({ userInfo, user }) => {
    const [display, setDisplay] = useState(false)

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
                    <svg className={styles.circle} onClick={() => setDisplay(!display)} aria-label="More options" fill="#262626" height="16" viewBox="0 0 48 48" width="16"><circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle></svg>
                    {display
                        ? <PostMenu userInfo={userInfo} closeMenu={() => setDisplay(false)} /> : null}
                </div>
                : <div>
                    {GetFollowers()
                        ? <div><button className={styles.followBtn} onClick={UnFollow}>Unfollow</button></div>
                        : <div><button className={styles.followBtn} onClick={Follow}>Follow</button></div>}
                </div>}
        </header>
    )
}

export default PostHeader