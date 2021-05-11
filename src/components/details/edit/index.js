import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.css'
import Input from '../../input'
import Textarea from "../../textarea"
import getCookie from '../../../utils/getCookie'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dataService from '../../../services/dataService'


const Edit = ({ closeMenu }) => {
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const params = useParams()

    const editPost = async (e) => {
        e.preventDefault();

        if (description.length <= 200) {
            try {
                await dataService({
                    method: 'PUT', url: `/post/edit/${params.id}`, data: { location, description }, token: getCookie('auth-token')
                })
                closeMenu()
            } catch (err) {
                console.error(err)
            }
        } else {
            toast.error('The Description should be max 200 character')
        }
    };

    return (
        <div className={styles.popUp}>
            <div className={styles.container}>
                <ToastContainer transition={Zoom} />
                <form >
                    <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                        type="post" />
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description" />
                    <div className={styles.buttons}>
                        <button onClick={editPost} className={styles.btn}>Save changes</button>
                        <button className={styles.cancelbtn} onClick={closeMenu}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit;