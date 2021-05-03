import React, { Fragment, useContext } from 'react'
import { faCompass, faHeart, faUser, faPlusSquare } from "@fortawesome/free-regular-svg-icons"
import styles from './index.module.css'
import UserContext from '../../Context'
import Link from '../link'
import Icons from '../icons'
import Search from '../search'

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <header className={styles.container}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <Link key='SmileFace' to='/' title='SmileFace' type="logo" />
                </div>
                <Search />
                <div className={styles.links}>
                    <Fragment>
                        <Icons type="nav" to="/add-post" icon={faPlusSquare} />
                        <Icons type="nav" to="/explore" icon={faCompass} />
                        <Icons type="nav" to="/notification" icon={faHeart} />
                        <Icons type="nav" to={`/profile/${user && user.id}`} icon={faUser} />
                    </Fragment>
                </div>
            </div>
        </header>
    )
}

export default Header