import React from 'react'
import styles from './index.module.css'
import PageLayout from '../page-layout'

const Spinner = () => {
    return (
        <PageLayout>
            <div className={styles.container}>
                <div className={styles['lds-spinner']}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </PageLayout>
    )
}

export default Spinner