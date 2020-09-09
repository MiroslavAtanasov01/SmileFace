import React, { useState } from 'react'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import Textarea from '../../components/textarea'
import Input from '../../components/input'
import Button from '../../components/button'


const AddPOst = () => {
    const [post, setPost] = useState("")
    const [location, setLocation] = useState("")

    const openWidget = () => {
        window.cloudinary.createUploadWidget(
            {
                cloudName: 'dzzbxneof',
                uploadPreset: 'softuni',
            }, (error, result) => {
                if (result.event === 'success') {
                    setPost(result.info.url)
                    // const picture = result.info.url
                    // const id = params.id
                    // fetch(`http://localhost:3333/api/post/picture/${id}`, {
                    //     method: "PUT",
                    //     headers: { 'Content-type': 'application/json' },
                    //     body: JSON.stringify({ picture })
                    // })
                }
            }).open();
    }

    return (
        <PageLayout>
            <div className={styles.main}>
                <h1 className={styles.title}>Add New Photo</h1>
                <div className={styles.container}>
                    <div className={styles.upload}>
                        {post ? <img className={styles.preview} src={post} alt="preview" /> : null}
                        <button className={styles.plus} onClick={openWidget}>  </button>
                        <p className={styles.text}>Upload image</p>
                    </div>
                    <div className={styles.form}>
                        <form>
                            <Input
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                                type='post'
                                placeholder="Location"
                            />
                            <Textarea placeholder='Description' />
                        </form>
                        <Button type='post' title="Post" />
                    </div>
                </div>
            </div>
        </PageLayout>
    )

}

export default AddPOst