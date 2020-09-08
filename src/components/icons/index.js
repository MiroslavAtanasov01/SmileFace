import React from 'react'
import styles from './index.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Icons = ({ href, icon }) => {
    return (
        <a href={href} className={styles.social}>
            <FontAwesomeIcon icon={icon} size="lg" />
        </a >
    )
}

export default Icons