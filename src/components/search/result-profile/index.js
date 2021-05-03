import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Profile = (props) => {
    return (
        <Link className={styles.link} to={`/profile/${props.id}`}>
            <div className={styles.container}>
                <img
                    src={props.imageUrl}
                    alt="user" className={styles.avatar} />
                <div className={styles.info}>
                    <span className={styles.username}>{props.username}</span>
                </div>
            </div>
        </Link>
    )
};

export default Profile;