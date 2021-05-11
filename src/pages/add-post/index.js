import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import Textarea from '../../components/textarea'
import Input from '../../components/input'
import Button from '../../components/button'
import getCookie from '../../utils/getCookie'
import PageTitle from '../../components/helmet'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dataService from '../../services/dataService'

const AddPost = () => {
    const [imageUrl, setImageUrl] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory()

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

        if (!imageUrl) {
            toast.error('Please upload photo')
        } else if (location.length > 20) {
            toast.error('The Location should be max 20 character')
        } else if (description.length > 200) {
            toast.error('The Description should be max 200 character')
        } else {
            try {
                await dataService({
                    method: 'POST', url: `/post`, data:
                        { imageUrl, location, description }, token: getCookie('auth-token')
                })
                history.push('/')
            } catch (err) {
                console.error(err)
            }
        }
    }

    return (
        <PageLayout>
            <PageTitle title="Add Post | SmileFace" />
            <ToastContainer transition={Zoom} />
            <div className={styles.main}>
                <h1 className={styles.title}>Add New Photo</h1>
                <div className={styles.container}>
                    <div className={styles.upload}>
                        {!imageUrl
                            ? <div>  <Button type='plus' onClick={openWidget} /> <p>Upload image</p> </div>
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

export default AddPost