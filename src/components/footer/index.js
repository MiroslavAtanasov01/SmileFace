import React from 'react'
import styles from './index.module.css'
import Link from '../link'


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <Link key='About' href='/about' title='ABOUT' type="footer" />
                <Link key='Contacts' href='/contacts' title='CONTACTS' type="footer" />
                <Link key='Top Accounts' href='/topAccounts' title='TOP ACCOUNTS' type="footer" />
                <select name="languages" className={styles.select} >
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="bg">Български</option>
                </select>
            </div>
            <div>
                <p className={styles.copyright}>&copy; 2020 SMILEFACE FROM MIROSLAV</p>
            </div>
        </footer>
    )
}

export default Footer