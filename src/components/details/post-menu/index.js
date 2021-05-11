import React, { useState } from 'react'
import styles from './index.module.css'
import getCookie from '../../../utils/getCookie'
import dataService from "../../../services/dataService"
import { useParams, useHistory } from 'react-router-dom'
import Edit from '../edit'

const PostMenu = ({ closeMenu, userInfo }) => {
    const params = useParams()
    const history = useHistory()
    const [displayEdit, setDisplayEdit] = useState(false)

    const DeletePost = async () => {
        const id = userInfo.postedBy._id
        await dataService({
            method: 'DELETE', url: `/post/delete/${params.id}`, data: { id }, token: getCookie('auth-token')
        })
        history.push(`/`)
    }

    return (
        <div className={styles.popUp}>
            <div className={styles.menu}>
                <div onClick={() => setDisplayEdit(true)} className={styles.option}>
                    <span >Edit</span>
                </div>
                <div onClick={DeletePost} className={styles.option}>
                    <span>Delete</span>
                </div>
                <div onClick={closeMenu} className={styles.option}>
                    <span>Cancel</span>
                </div>
            </div>
            {displayEdit ? <Edit closeMenu={closeMenu} /> : null}
        </div>
    )
}

export default PostMenu