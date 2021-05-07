import React from 'react'
import styles from './index.module.css'
import PostHeader from './header'
import PostActions from './actions'
import Likes from './likes'
import CommentSection from './comment-section'
import AddComment from './add-comment'

const Post = ({ description, location, createdAt, imageUrl, likes, postedBy, _id, comments }) => {
    const formatDate = (date) => { return date.substring(0, 10).split('-').join(' ') }

    return (
        <div className={styles.post}>
            <PostHeader location={location} postedBy={postedBy} />
            <img className={styles['post-image']} src={imageUrl} alt="" />
            <div className={styles.container}>
                <PostActions likes={likes} _id={_id} />
                <Likes likes={likes} />
                {description ? <div className={styles.description}><strong>{postedBy.username}</strong>{description}</div> : null}
                <CommentSection comments={comments} _id={_id} />
                <div className={styles.date}>{formatDate(createdAt)}</div>
                <AddComment _id={_id} />
            </div>
        </div>
    )
}

export default Post