import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const CommentSection = ({ comments, _id }) => {
    const renderComments = () => {
        return comments
            .slice(-3)
            .map((e, i) => {
                return (
                    <div key={e._id} className={styles.comment}>
                        <Link to={`/profile/${e.postedBy._id}`}>
                            <strong><span>{e.postedBy.username}</span></strong>
                        </Link>
                        <span className={styles.textComment}>{e.comment}</span>
                    </div>
                )
            })
    }

    return (
        <div>
            {comments.length > 3
                ? <Link to={`/details/${_id}`}><span className={styles.allComments}>View all comments</span></Link>
                : null}
            {renderComments()}
        </div>
    )
}

export default CommentSection