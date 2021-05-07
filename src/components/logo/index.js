import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <Link to="/">SmileFace</Link>
        </div>
    )
};

export default Logo;