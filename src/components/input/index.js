import React from 'react'
import styles from './index.module.css'

const Input = ({ id, value, onChange, onBlur, placeholder, name, error }) => {
    return (
        <div>
            <div >
                <input className={styles.input}
                    type={name || 'text'}
                    id={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                />
            </div>
            <div className={styles.error}>{error ? error : ''}</div>
        </div>
    )
}

export default Input