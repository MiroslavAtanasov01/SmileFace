import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const PostHeader = ({ location, postedBy }) => {
    return (
        <div className={styles.container} >
            <Link to={`profile/${postedBy._id}`}> <img className={styles.avatar} alt="" src={postedBy.profilePicture} /></Link>
            <div>
                <Link to={`profile/${postedBy._id}`} className={styles.username}>{postedBy.username}</Link>
                <div className={styles.location}>{location}</div>
            </div>
        </div>
    )
}

export default PostHeader;