import React from 'react'
import { MemoryRouter as Router, Route, Switch } from 'react-router'
import AuthenticatedRoute from '../components/AuthenticatedRoute'

// Import Routes
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'

export default class MainRouter extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <AuthenticatedRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    )
  }
}