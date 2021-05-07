import React from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'
import heartIcon from '../../images/heart.svg'
import commentIcon from '../../images/comment.svg'


const PostExplore = ({ imageUrl, likes, comments, _id }) => {
    const history = useHistory()
    const imageClick = () => {
        history.push(`/details/${_id}`)
    }

    return (
        <div className={styles.container}>
            <img alt="post" className={styles.image} src={imageUrl} onClick={() => imageClick()}></img>
            <div className={styles.likes}>
                <span className={styles.distance}>
                    <img className={styles.icon} src={heartIcon} alt="heart" />
                    {likes.length}
                </span>
                <span>
                    <img className={styles.icon} src={commentIcon} alt="comment" />
                    {comments.length}
                </span>
            </div>
        </div>
    )
}

export default PostExplore