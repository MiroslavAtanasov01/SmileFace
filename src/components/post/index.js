import React from 'react'
import style from './index.module.css'
import Avatar from '@material-ui/core/Avatar'

const Post = ({ username, caption, imageUrl, _id }) => {

    return (
        <div className={style.post}>
            <div className={style['post-header']}>
                <Avatar className={style['post-avatar']} alt="miro" src='static/images/avatar/1.jpg'>
                </Avatar>
                <h3>{username}</h3>
            </div>
            <img className={style['post-image']} src={imageUrl} alt="" />
            <h4 className={style['post-text']}><strong>{username}</strong> {caption}</h4>
        </div>

    )
}

export default Post