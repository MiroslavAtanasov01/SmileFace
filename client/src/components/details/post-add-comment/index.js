import React from "react"
import { useParams } from 'react-router-dom'
import styles from './index.module.css'
import getCookie from '../../../utils/getCookie'
import dataService from "../../../services/dataService"
import Button from '../../button'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const AddComment = ({ setComment, comment }) => {
    const params = useParams()

    const AddComment = async (e) => {
        e.preventDefault()
        const postId = params.id

        try {
            if (comment && comment.length <= 200) {
                await dataService({
                    method: 'PUT', url: `/post/postComment`, data: { postId, comment }, token: getCookie('auth-token')
                })
            } else {
                toast.error('The comment should be max 200 character')
            }
            setComment('')
        } catch (err) {
            return err
        }
    }

    return (
        <form className={styles.container} onSubmit={AddComment}>
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