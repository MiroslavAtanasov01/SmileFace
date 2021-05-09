import React from 'react'
import styles from './index.module.css'

const Likes = ({ likes }) => {
    return (
        <div>
            {likes.length ? <div className={styles.comment}>{likes.length} {likes.length > 1 ? 'likes' : 'like'}</div> : null}
        </div>
    )
}

export default Likes