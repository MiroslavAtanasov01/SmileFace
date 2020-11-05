import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const LinkComponent = ({ to, title, type }) => {
    return (
        <div className={styles[`${type}-link`]}>
            <Link to={to} className={styles[`${type}-a`]}>
                {title}
            </Link>
        </div>
    )
}

export default LinkComponent