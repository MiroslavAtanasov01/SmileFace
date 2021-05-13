import React from 'react'
import styles from './index.module.css'

const ProfileFollowers = ({ userInfo }) => {
    return (
        <ul className={styles.container}>
            <li><strong>{userInfo.posts.length}</strong> posts</li>
            <li><strong>{userInfo.followers.length}</strong> followers</li>
            <li><strong>{userInfo.following.length}</strong> following</li>
        </ul>
    )
}

export default ProfileFollowers