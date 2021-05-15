import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import Button from '../../button'
import getCookie from '../../../utils/getCookie'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dataService from '../../../services/dataService'

const AddComment = ({ _id }) => {
    const [comment, setComment] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        const postId = _id

        if (comment && comment.length <= 200) {
            await dataService({
                method: 'PUT', url: `/post/postComment`, data: { postId, comment }, token: getCookie('auth-token')
            })
        } else {
            toast.error('The comment should be max 200 character')
        }
        setComment('')
    }

    useEffect(() => { }, [comment])

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <ToastContainer transition={Zoom} />
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