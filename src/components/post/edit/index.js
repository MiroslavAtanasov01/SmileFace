import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import styles from './index.module.css';
import Input from '../../input';
import Textarea from "../../textarea";
import getCookie from '../../../utils/getCookie'

const Edit = () => {
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const params = useParams()
    const history = useHistory()


    const editPost = async (e) => {
        e.preventDefault();


        if (location !== '' || description !== '') {
            try {
                await fetch(`http://localhost:3333/api/post/edit/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        location, description
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('auth-token')
                    }
                })
                history.push('/')
            } catch (err) {
                console.error(err)
            }
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    type="text" />
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Caption..." />
                <button onClick={editPost} className={styles.btn}>Save changes</button>
            </form>
        </div>
    )
}

export default Edit;