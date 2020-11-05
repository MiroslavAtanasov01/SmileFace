import React from 'react'
import styles from './index.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'


const Icons = ({ to, icon, type, onClick }) => {
    return (
        <Link onClick={onClick} to={to} className={styles[`${type}-social`]}>
            <FontAwesomeIcon icon={icon} size="lg" />
        </Link >
    )
}

export default Icons