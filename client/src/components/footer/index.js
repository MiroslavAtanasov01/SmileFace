import React from 'react'
import styles from './index.module.css'

const Footer = () => {
    return (
        <div className={styles.main}>
            <footer className={styles.footer}>
                <div className={styles.copyright}>&copy; {new Date().getFullYear()} SMILEFACE FROM MIROSLAV</div>
            </footer>
        </div>
    )
}

export default Footer