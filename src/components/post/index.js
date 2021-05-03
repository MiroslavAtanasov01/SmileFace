import React, { useContext, useState, useEffect } from 'react'
import style from './index.module.css'
import { useHistory } from 'react-router-dom'
import Icons from '../icons'
import Button from '../button'
import getCookie from '../../utils/getCookie'
import UserContext from '../../Context'
import { faHeart, faGrinStars, faComment } from "@fortawesome/free-regular-svg-icons"

const Post = ({ username, createdAt, caption, imageUrl, likes, postedBy, _id, comments }) => {
    const history = useHistory()
    const context = useContext(UserContext)
    const [comment, setComment] = useState('')

    const onClick = () => {
        history.push(`profile/${postedBy._id}`)
    }

    const onClickUsers = (id) => {
        history.push(`/profile/${id}`)
    }

    const onSubmit = async (e) => {
        if (comment !== '') {
            e.preventDefault()
            const postId = _id

            try {
                await fetch('http://localhost:3333/api/post/postComment', {
                    method: 'PUT',
                    body: JSON.stringify({ postId, comment }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('auth-token')
                    }
                })
                setComment('')
            } catch (err) {
                console.error(err)
            }
        }

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

    const goToComments = () => {
        history.push(`/details/${_id}`)
    }

    const renderComments = () => {
        return comments
            .slice(-3)
            .map((e, i) => {
                return (
                    <div key={e._id} className={style.comment}>
                        <strong><span onClick={() => onClickUsers(e.postedBy._id)}>{e.postedBy.username}</span></strong>
                        <span className={style.textComment}>{e.comment}</span>
                    </div>
                )
            })
    }

    const formatDate = (date) => {
        return date
            .substring(0, 10)
            .split('-')
            .join(' ')
    }


    useEffect(() => {
    }, [comment])

    return (
        <div className={style.post}>
            <div className={style['post-header']} >
                <img onClick={onClick} className={style['post-avatar']} alt="" src={postedBy.profilePicture} />
                <h3 onClick={onClick} className={style['post-username']}>{postedBy.username}</h3>
            </div>
            <img className={style['post-image']} src={imageUrl} alt="" />
            {likes.includes(context.user.id) ?
                <Icons type="nav" to="" onClick={() => likePost('unlike')} icon={faGrinStars} /> :
                <Icons type="nav" to="" onClick={() => likePost('like')} icon={faHeart} />}
            <span onClick={() => goToComments()} >
                <Icons type="nav" to="" onClick={() => onClick()} icon={faComment} />
            </span>
            <div className={style.div}>
                <div>{likes.length} likes</div>
                <div>{formatDate(createdAt)}</div>
            </div>
            <div className={style.commentsMargin}>
                {renderComments()}
                {comments.length > 3 ? <span onClick={() => goToComments()} className={style.allComments}>View all comments</span> : null}
            </div>
            <form className={style['post-comments']} onSubmit={onSubmit}>
                <div className={style['div-textarea']}>
                    <textarea
                        value={comment}
                        className={style['post-textarea']}
                        placeholder="Add a comment"
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                </div>
                <Button type='postComment' title="Post" />
            </form >

        </div>

    )
}

export default Post