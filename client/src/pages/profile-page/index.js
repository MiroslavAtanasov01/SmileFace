import React, { useState, useEffect, useCallback } from 'react'
import PageLayout from '../../components/page-layout'
import styles from './index.module.css'
import { useParams, useHistory } from 'react-router-dom'
import Spinner from '../../components/loading-spinner'
import PageTitle from '../../components/helmet'
import dataService from '../../services/dataService'
import ProfilePicture from './profile-picture'
import Posts from './posts'
import Actions from './actions'
import ProfileFollowers from './profile-followers'

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({
        email: '', username: '', profilePicture: '', followers: [], following: [], posts: []
    })
    const params = useParams()
    const history = useHistory()

    const getData = useCallback(async () => {
        const response = await dataService({ method: 'GET', url: `/user/${params.id}` })

        if (!response.ok) {
            history.push('/error')
        } else {
            const user = await response.json()
            setUserInfo({ ...user })
        }
    }, [params.id, history])


    useEffect(() => {
        getData()
    }, [getData])


    if (userInfo.username === '') {
        return (
            <Spinner />
        )
    }

    return (
        <PageLayout>
            <PageTitle title={`${userInfo.username} | SmileFace`} />
            <div className={styles.container}>
                <header className={styles.header}>
                    <ProfilePicture userInfo={userInfo} setUserInfo={setUserInfo} />
                    <section className={styles.section}>
                        <Actions userInfo={userInfo} />
                        <ProfileFollowers userInfo={userInfo} />
                        <div className={styles.description}>{userInfo.description}</div>
                    </section>
                </header>
                <Posts userInfo={userInfo} />
            </div>
        </PageLayout >
    )
}

export default ProfilePage