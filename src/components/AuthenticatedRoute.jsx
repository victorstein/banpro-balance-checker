import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthenticatedRoute = (props) => {

  let user = localStorage.getItem('user')
  let password = localStorage.getItem('password')

  return (
    <React.Fragment>
      {
        user && password
          ? <Route {...props} />
          : <Redirect to='/' />
      }
    </React.Fragment>
  )
}

export default AuthenticatedRoute