import React from 'react'
import styles from './index.module.css'

const Textarea = ({ value, onChange, placeholder }) => {
    return (
        <div className={styles.container}>
            <textarea defaultValue={value} onChange={onChange} placeholder={placeholder}></textarea>
        </div>
    )
}

export default Textarea