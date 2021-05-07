import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styles from './index.module.css'
import UserContext from '../../Context'
import homeIcon from '../../images/home-run.svg'
import addPostIcon from '../../images/plus.svg'
import userIcon from '../../images/user.svg'
import exploreIcon from '../../images/camera.svg'
import Logo from '../logo'
import Search from '../search'

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <header className={styles.container}>
            <nav className={styles.nav}>
                <Logo />
                <Search />
                <div className={styles.links}>
                    <ul className={styles["nav-icons"]}>
                        <li><Link to="/"><img className={styles.icon} src={homeIcon} alt="home" /></Link></li>
                        <li><Link to="/add-post"><img className={styles.icon} src={addPostIcon} alt="add-post" /></Link></li>
                        <li><Link to="/explore"><img className={styles.icon} src={exploreIcon} alt="explore" /></Link></li>
                        <li><Link to={`/profile/${user && user.id}`}><img className={styles.icon} src={userIcon} alt="profile" /></Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header