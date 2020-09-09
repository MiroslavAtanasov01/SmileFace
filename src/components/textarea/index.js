import React from 'react';
import styles from './index.module.css';

const Textarea = (props) => {
    return (
        <div className={styles.container}>
            <textarea
                defaultValue={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}></textarea>
        </div>
    )
}

export default Textarea;