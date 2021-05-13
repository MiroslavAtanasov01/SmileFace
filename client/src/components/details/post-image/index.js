import React from 'react'
import styles from './index.module.css'

const PostImage = ({ userInfo }) => {
    return (
        <div className={styles.container}>
            <img className={styles.image} alt='post-photos' src={userInfo.imageUrl} />
        </div>
    )
}

export default PostImage