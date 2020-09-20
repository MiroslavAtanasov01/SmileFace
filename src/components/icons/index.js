import React from 'react'
import styles from './index.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Icons = ({ href, icon, type }) => {
    return (
        <a href={href} className={styles[`${type}-social`]}>
            <FontAwesomeIcon icon={icon} size="lg" />
        </a >
    )
}

export default Icons