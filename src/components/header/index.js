import React, { Fragment, useContext } from 'react'
import { faCompass, faHeart, faUser, faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons"
import styles from './index.module.css'
import UserContext from '../../Context'
import Link from '../link'
import Icons from '../icons'

const Header = () => {
    const { loggedIn, user } = useContext(UserContext);

    return (
        <header className={styles.container}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <Link key='SmileFace' href='/' title='SmileFace' type="logo" />
                </div>
                <div className={styles.search}>
                    <input type="text" placeholder="Search.."></input>
                </div>
                <div className={styles.links}>
                    {loggedIn
                        ?
                        <Fragment>
                            <Icons href="/messages" icon={faComment} />
                            <Icons href="/add-post" icon={faPlusSquare} />
                            <Icons href="/explore" icon={faCompass} />
                            <Icons href="/notification" icon={faHeart} />
                            <Icons href={`/profile/${user && user.id}`} icon={faUser} />
                        </Fragment>
                        :
                        <Fragment>
                            <Link key='Log In' href='/login' title='Log In' type="log" />
                            <Link key='Sign Up' href='/register' title='Sign Up' type="sign" />
                        </Fragment>
                    }
                </div>
            </div>
        </header>
    )

}

export default Header