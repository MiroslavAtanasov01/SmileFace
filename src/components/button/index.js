import React from 'react'
import styles from './index.module.css'

const Button = ({ type, title }) => {
    return (
        <div className={styles[[`${type}-container`]]}>
            <button className={styles[`${type}-btn`]}>
                {title}
            </button>
        </div>
    )
}

export default Button