import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import Button from '../../button'
import getCookie from '../../../utils/getCookie'

const AddComment = ({ _id }) => {
    const [comment, setComment] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        const postId = _id

        try {
            if (comment && comment.length <= 200) {
                await fetch('http://localhost:3333/api/post/postComment', {
                    method: 'PUT',
                    body: JSON.stringify({ postId, comment }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('auth-token')
                    }
                })
            } else {
                console.log('The comment should be max 200 character')
            }
            setComment('')
        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => { }, [comment])

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <textarea
                value={comment}
                className={styles.textarea}
                placeholder="Add a comment"
                onChange={(e) => setComment(e.target.value)}>
            </textarea>
            <Button type='postComment' title="Post" disabled={comment ? false : true} />
        </form >
    )
}

export default AddComment