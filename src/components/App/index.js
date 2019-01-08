import React from 'react'
import { Route } from 'react-router-dom'
import { compose } from 'recompose'
import { withAuthentication } from '../Session'

import Navigation from '../Navigation'
import Landing from '../Landing'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import PasswordForget from '../PasswordForget'
import Home from '../Home'
import Account from '../Account'
import Admin from '../Admin'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const {
  LANDING,
  SIGN_UP,
  SIGN_IN,
  PASSWORD_FORGET,
  HOME,
  ACCOUNT,
  ADMIN
} = ROUTES

const App = () => {
  return (
    <div>
      <Navigation />
      <hr />
      <Route exact path={LANDING} component={Landing} />
      <Route exact path={SIGN_UP} component={SignUp} />
      <Route exact path={SIGN_IN} component={SignIn} />
      <Route exact path={PASSWORD_FORGET} component={PasswordForget} />
      <Route exact path={HOME} component={Home} />
      <Route exact path={ACCOUNT} component={Account} />
      <Route exact path={ADMIN} component={Admin} />
    </div>
  )
}

export default compose(withAuthentication)(App)