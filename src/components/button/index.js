import React from 'react'
import styles from './index.module.css'

const Button = () => {
    return (
        <div className={styles.container}>
            <button className={styles.btn}>
                <div className={styles.main}>
                    Log in
                </div>
            </button>
        </div>
    )
}

export default Button