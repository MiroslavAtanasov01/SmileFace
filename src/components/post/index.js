import React, { useContext } from 'react'
import style from './index.module.css'
import { useHistory } from 'react-router-dom'
import Icons from '../icons'
import getCookie from '../../utils/getCookie'
import UserContext from '../../Context'
import { faHeart, faGrinStars } from "@fortawesome/free-regular-svg-icons"

const Post = ({ username, caption, imageUrl, likes, postedBy, _id }) => {
    const history = useHistory()
    const context = useContext(UserContext)

    const onClick = () => {
        history.push(`profile/${postedBy._id}`)
    }

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
        <div className={style.post}>
            <div className={style['post-header']} onClick={onClick}>
                <img className={style['post-avatar']} alt="" src={postedBy.profilePicture} />
                <h3 className={style['post-username']}>{postedBy.username}</h3>
            </div>
            <img className={style['post-image']} src={imageUrl} alt="" />
            {likes.includes(context.user.id) ?
                <Icons type="nav" to="" onClick={() => likePost('unlike')} icon={faGrinStars} /> :
                <Icons type="nav" to="" onClick={() => likePost('like')} icon={faHeart} />}
            <span>{likes.length} likes</span>
            <h4 className={style['post-text']}><strong>{username}</strong> {caption}</h4>
        </div>

    )
}

export default Post