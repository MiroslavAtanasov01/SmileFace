import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import Textarea from '../../components/textarea'
import Input from '../../components/input'
import Button from '../../components/button'
import getCookie from '../../utils/getCookie'

const AddPOst = () => {
    const [imageUrl, setImageUrl] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory()
    const token = getCookie('auth-token')

    const openWidget = () => {
        window.cloudinary.createUploadWidget(
            {
                cloudName: 'dzzbxneof',
                uploadPreset: 'softuni',
            }, (error, result) => {
                if (result.event === 'success') {
                    setImageUrl(result.info.url)
                }
            }).open();
    }

    const submitPost = async (e) => {
        e.preventDefault()

        try {
            await fetch("http://localhost:3333/api/post", {
                method: "POST",
                body: JSON.stringify({ imageUrl, location, description }),
                headers: { 'Content-Type': 'application/json', 'Authorization': token },
            })
            history.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <PageLayout>
            <div className={styles.main}>
                <h1 className={styles.title}>Add New Photo</h1>
                <div className={styles.container}>
                    <div className={styles.upload}>
                        {!imageUrl
                            ? <div>  <Button type='plus' onClick={openWidget} />
                                <p className={styles.text}>Upload image</p> </div>
                            : <img className={styles.preview} src={imageUrl} alt="preview" />}
                    </div>
                    <div className={styles.form}>
                        <form onSubmit={submitPost}>
                            <Input value={location} onChange={(event) => setLocation(event.target.value)} type='post' placeholder="Location" />
                            <Textarea placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                            <Button type='post' title="Post" />
                        </form>
                    </div>
                </div>
            </div>
        </PageLayout>
    )

}

export default AddPOst