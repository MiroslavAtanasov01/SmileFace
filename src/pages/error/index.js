import React from 'react'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import Link from '../../components/link'


const ErrorPage = () => {
    return (
        <PageLayout>
            <div className={styles.container}>
                <h2 className={styles.title}>Sorry, this page isn't available.</h2>
                <span className={styles.text}>The link you followed may be broken, or the page may have been removed.
                 <Link key='Go back to SmileFace.' href="/" title='Go back to SmileFace.' type='error' />
                </span>
            </div>
        </PageLayout>
    )
}

export default ErrorPage