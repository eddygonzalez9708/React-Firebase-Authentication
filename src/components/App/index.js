import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'

import * as ROUTES from '../../constants/routes'
import Navigation from '../Navigation'
import Landing from '../Landing'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import PasswordForget from '../PasswordForget'
import Home from '../Home'
import Account from '../Account'
import Admin from '../Admin'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      authUser: null
    }
  }

  componentDidMount () {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser 
        ? this.setState({ authUser })
        : this.setState({ authUser: null })
    })
  }

  componentWillUnmount () {
    this.listener()
  }

  render () {
    return (
      <div>
        <Navigation authUser={this.state.authUser} />
        <hr />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.ACCOUNT} component={Account} />
        <Route exact path={ROUTES.ADMIN} component={Admin} />
      </div>
    )
  }
}

export default compose(withFirebase)(App)