import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.css'
import UserContext from '../../../Context'
import dataService from '../../../services/dataService'

const ProfilePicture = ({ userInfo, setUserInfo }) => {
    const context = useContext(UserContext)
    const params = useParams()

    const openWidget = () => {
        window.cloudinary.createUploadWidget(
            {
                cloudName: 'dzzbxneof',
                uploadPreset: 'softuni',
            }, async (error, result) => {
                if (result.event === 'success') {
                    setUserInfo({ ...userInfo, profilePicture: result.info.url })
                    const picture = result.info.url
                    await dataService({ method: 'PUT', url: `/user/picture/${params.id}`, data: { picture } })
                }
            }).open()
    }

    return (
        <div className={styles.container}>
            {context.user.id === params.id
                ? < img onClick={openWidget} alt="Profile" src={userInfo.profilePicture}></img>
                : < img alt="Profile" src={userInfo.profilePicture}></img>
            }
        </div>
    )

}

export default ProfilePicture