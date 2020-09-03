import React from 'react'
import styles from './index.module.css'

const Input = ({ label, id, value, onChange, onBlur, placeholder, type, name }) => {
    return (
        <div className={styles[`${type}-container`]}>
            <label className={styles.label}>
                {/* <div className={styles[`${type}-inner-container`]}>
                <label className={styles[`${type}-label`]} htmlFor={id}>{label}</label>
            </div> */}
                <span className={styles.span}>
                    {placeholder}
                </span>
                <input type={name || 'text'} className={styles[`${type}-input`]} id={id} value={value} onChange={onChange} onBlur={onBlur} />
            </label>
        </div>
    )

}

export default Input