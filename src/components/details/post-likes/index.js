import React from 'react'
import styles from './index.module.css'
import { useParams } from 'react-router-dom'
import getCookie from '../../../utils/getCookie'
import dataService from "../../../services/dataService"
import heartIcon from '../../../images/heart.svg'
import redHeartIcon from '../../../images/redHeart.svg'

const PostLikes = ({ userInfo, user }) => {
    const params = useParams()

    const likePost = async (action) => {
        const postId = params.id
        await dataService({
            method: 'PUT', url: `/post/${action}`, data: { postId }, token: getCookie('auth-token')
        })
    }

    const isPostLiked = () => {
        let result = false
        if (userInfo.likes !== undefined) {
            if (userInfo.likes.length > 0) {
                userInfo.likes.forEach(u => {
                    if (u._id === user._id) {
                        result = true
                    }
                })
            }
            return result
        }

    }

    return (
        <div className={styles.container}>
            {isPostLiked()
                ? <img src={redHeartIcon} alt="redHeart" className={styles.action} onClick={() => likePost('unlike')} />
                : <img src={heartIcon} alt="heart" className={styles.action} onClick={() => likePost('like')} />}
            {userInfo.likes.length
                ? <div className={styles.comment}>{userInfo.likes.length} {userInfo.likes.length > 1 ? 'likes' : 'like'}</div>
                : <div className={styles.noComment}>Be the first to <strong>like this</strong></div>
            }
        </div>
    )
}

export default PostLikes