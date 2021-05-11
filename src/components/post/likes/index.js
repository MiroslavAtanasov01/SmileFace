import React from 'react'
import styles from './index.module.css'

const Likes = ({ likes }) => {
    return (
        <div>
            {likes.length
                ? <div className={styles.comment}>{likes.length} {likes.length > 1 ? 'likes' : 'like'}</div>
                : <div className={styles.noComment}>Be the first to <strong>like this</strong></div>}
        </div>
    )
}

export default Likes