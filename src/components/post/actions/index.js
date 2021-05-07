import React, { useContext } from 'react';
import styles from './index.module.css';
import heartIcon from '../../../images/heart.svg'
import redHeartIcon from '../../../images/redHeart.svg'
import commentIcon from '../../../images/comment.svg'
import UserContext from '../../../Context';
import getCookie from '../../../utils/getCookie'
import { Link } from 'react-router-dom'

const PostActions = ({ likes, _id }) => {
    const context = useContext(UserContext);

    const likePost = (action) => {
        const postId = _id
        fetch(`http://localhost:3333/api/post/${action}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('auth-token')
            },
            body: JSON.stringify({ postId })
        })
    }

    return (
        <div className={styles.container}>
            <span>
                {likes.includes(context.user.id)
                    ? <img src={redHeartIcon} alt="redHeart" className={styles.action} onClick={() => likePost('unlike')} />
                    : <img src={heartIcon} alt="heart" className={styles.action} onClick={() => likePost('like')} />}
            </span>
            <span  >
                <Link to={`/details/${_id}`}> <img className={styles.action} src={commentIcon} alt="comments" /></Link>
            </span>
        </div>
    )
};

export default PostActions;