import React, { useCallback, useState, useEffect, useContext } from "react"
import { useParams, useHistory } from 'react-router-dom'
import styles from './index.module.css'
import UserContext from '../../Context'
import Spinner from '../loading-spinner'
import PageTitle from '../helmet'
import dataService from "../../services/dataService"
import PageLayout from '../page-layout'
import PostImage from "./post-image"
import PostHeader from "./post-header"
import Comments from './comments'
import PostLikes from './post-likes'
import AddComment from './post-add-comment'


const DetailsPage = () => {
    const params = useParams()
    const history = useHistory()
    const context = useContext(UserContext)
    const [user, setUser] = useState(
        { _id: '', email: '', username: '', profilePicture: '', followers: [], following: [], posts: [] })
    const [userInfo, setUserInfo] = useState(
        { postedBy: '', createdAt: '', location: '', imageUrl: '', description: '', likes: [], comments: [] })
    const [comment, setComment] = useState('')

    const formatDate = (date) => { return date.substring(0, 10).split('-').join(' ') }


    const getData = useCallback(async () => {
        const response = await dataService({ method: 'GET', url: `/post/details/${params.id}` })

        if (!response.ok) {
            history.push('/error')
        } else {
            const post = await response.json()
            setUserInfo({ ...post })
        }

        if (context.user !== null) {
            const responseUser = await dataService({ method: 'GET', url: `/user/${context.user.id}` })

            if (!responseUser.ok) {
                history.push('/error')
            } else {
                const user = await responseUser.json()
                setUser({ ...user })
            }
        }

    }, [history, context, params.id])

    useEffect(() => {
        getData()
    }, [comment, getData])

    if (user.username === '') {
        return (
            <Spinner />
        )
    }

    return (
        <PageLayout>
            <div className={styles.container}>
                <PageTitle title="SmileFace" />
                <div className={styles.main}>
                    <PostImage userInfo={userInfo} />
                    <div className={styles.info}>
                        <PostHeader userInfo={userInfo} user={user} />
                        <Comments userInfo={userInfo} user={user} />
                        <PostLikes userInfo={userInfo} user={user} />
                        <div className={styles.date}>{formatDate(userInfo.createdAt)}</div>
                        <AddComment setComment={setComment} comment={comment} />
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default DetailsPage