import React from 'react'
import styles from './index.module.css'

const Input = ({ label, id, value, onChange, onBlur, placeholder, type, name }) => {
    return (
        <div className={styles[`${type}-container`]}>
            <div className={styles[`${type}-inner-container`]}>
                <label className={styles[`${type}-label`]} htmlFor={id}>{label}</label>
            </div>
            <input type={name || 'text'} className={styles[`${type}-input`]} id={id} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} />
        </div>
    )

}

export default Input