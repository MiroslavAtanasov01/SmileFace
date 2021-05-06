import React from 'react'
import styles from './index.module.css'

const Button = ({ type, title, onClick, disabled }) => {
    return (
        <div className={styles[[`${type}-container`]]}>
            <button className={styles[`${type}-btn`]} onClick={onClick} disabled={disabled}>
                {title}
            </button>
        </div>
    )
}

export default Button