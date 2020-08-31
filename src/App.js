import React from 'react'
// import UserContext from './Context'

const App = (props) => {
  return (
    // <UserContext.Provider value={{}}>
    <div>
      {props.children}
    </div>
    // </UserContext.Provider>
  )
}

export default App
