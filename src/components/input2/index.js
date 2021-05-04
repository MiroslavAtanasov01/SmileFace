import React from 'react';
import styles from './index.module.css';

const Input2 = (props) => {
    return (
        <div className={styles["input-container"]}>
            <input
                className={styles["custom-input"]}
                autoComplete="off"
                defaultValue={props.value}
                onChange={props.onChange}
                type={props.type}
                placeholder={props.placeholder} />
        </div>
    );
};

export default Input2;