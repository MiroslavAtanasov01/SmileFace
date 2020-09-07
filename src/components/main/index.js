import React from 'react'
import style from './index.module.css'
import Post from '../post'
import PageLayout from '../page-layout'

const Main = () => {
    return (
        <PageLayout>

            <div className={style.main}>
                <h1>Hello World</h1>

                <Post username="miro" caption="Wow it works" imageUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />
                <Post username="gosho" caption="DOPE" imageUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />
                <Post username="sasho" caption="It`s fun project" imageUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />

            </div>
        </PageLayout>

    )
}

export default Main