import React, { useState, useEffect } from 'react'
import PageLayout from '../../components/page-layout'
import styles from './index.module.css'
import PostExplore from '../../components/postExplore'
import getCookie from '../../utils/getCookie'
import PageTitle from '../../components/helmet'

const Explore = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const promise = await fetch('http://localhost:3333/api/post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('auth-token')
            }
        }
        )
        const posts = await promise.json()
        setPosts(posts)
    }

    const renderPosts = () => {
        return posts.map(post => {
            return (
                <PostExplore key={post._id} {...post} />
            )
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <PageLayout>
            <PageTitle title="Explore | SmileFace" />
            <div className={styles.container}>
                {renderPosts()}
            </div>
        </PageLayout>
    )
}

export default Explore