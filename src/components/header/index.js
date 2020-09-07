import React, { Fragment, useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import Link from '../link'

const Header = () => {
    const { loggedIn, user } = useContext(UserContext);

    return (
        <header className={styles.container}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <Link key='SmileFace' href='/' title='SmileFace' type="logo" />
                </div>
                <div className={styles.search}>
                    Search...
            </div>
                <div className={styles.links}>
                    {loggedIn
                        ?
                        <Fragment>
                            <Link key='Messages' href='/messages' title='M' type="links" />
                            <Link key='Notification' href='/notification' title='N' type="links" />
                            <Link key='Explore' href='/explore' title='E' type="links" />
                            <Link key='Profile' href={`/profile/${user && user.id}`} title='P' type="links" />
                        </Fragment>
                        :
                        <Fragment>
                            <Link key='Log In' href='/login' title='Log In' type="sign" />
                            <Link key='Sign Up' href='/register' title='Sign Up' type="sign" />
                        </Fragment>
                    }
                </div>
            </div>
        </header>
    )

}

export default Header