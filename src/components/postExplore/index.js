import React from 'react'
import styles from './index.module.css'
// import { useHistory } from 'react-router-dom'
import Icons from '../icons'
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons"


const PostExplore = ({ imageUrl, likes, comments }) => {
    // const history = useHistory()
    const imageClick = () => {
        // history.push(`/details/${_id}`)
    }

    return (
        <div className={styles.container}>
            <img alt="post" className={styles.image} src={imageUrl} onClick={() => imageClick()}></img>
            <div className={styles.likes}>
                <span className={styles.distance}>
                    <Icons type="image" href="" icon={faHeart} />
                    {likes.length}
                </span>
                <span>
                    <Icons type="image" href="" icon={faComment} />
                    {comments.length}
                </span>
            </div>
        </div>
    )
}

export default PostExplore