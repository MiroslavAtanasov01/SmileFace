import React from 'react'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import { Link } from 'react-router-dom'
import PageTitle from '../../components/helmet'

const ErrorPage = () => {
    return (
        <PageLayout>
            <PageTitle title="Error | SmileFace" />
            <div className={styles.container}>
                <h2>Sorry, this page isn't available.</h2>
                <span>The link you followed may be broken, or the page may have been removed.
                    <Link to='/'>Go back to SmileFace.</Link>
                </span>
            </div>
        </PageLayout>
    )
}

export default ErrorPage