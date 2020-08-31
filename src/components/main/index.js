import React from 'react'
import style from './index.module.css'
import Post from '../post'

const Main = () => {
    return (
        <div className={style.main}>
            <div className={style.header}>
                <img
                    className={style.headerImage}
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                >
                </img>
            </div>

            <h1>Hello World</h1>

            <Post username="miro" caption="Wow it works" imageUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />
            <Post username="gosho" caption="DOPE" imageUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />
            <Post username="sasho" caption="It`s fun project" imageUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />

        </div>
    )
}

export default Main