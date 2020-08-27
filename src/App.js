import React from 'react'
import styles from './App.module.css'
import Background from '../src/images/760933.jpg'

const App = () => {
  return (
    <div className={styles.main}>
      <div>
        <img src={Background}></img>
      </div>
      <div>
        <h1>SmileFace</h1>
        <div>
          <form className={styles.form}>
            <div>
              <label htmlFor='username'>username</label>
              <input type='text' value='username' />
            </div>
            <div>
              <label htmlFor='username'>username</label>
              <input type='text' value='username' />
            </div>
            <div>
              <label htmlFor='username'>username</label>
              <input type='text' value='username' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
