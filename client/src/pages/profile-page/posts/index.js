import React from 'react'
import styles from './index.module.css'
import PostExplore from '../../../components/postExplore'

const Posts = ({ userInfo }) => {
    const renderPosts = () => {
        if (userInfo.posts.length === 0) {
            return (
                <div className={styles.empty}>
                    <h1>There is no posts</h1>
                </div>
            )
        }
        return userInfo.posts.map(post => {
            return (
                <PostExplore key={post._id} {...post} />
            )
        })
    }

    return (
        <div className={styles.main}>
            {renderPosts()}
        </div>
    )
}

export default Posts