import React from 'react'
import styles from './index.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'


const Icons = ({ href, icon, type }) => {
    return (
        <Link to={href} className={styles[`${type}-social`]}>
            <FontAwesomeIcon icon={icon} size="lg" />
        </Link >
    )
}

export default Icons