import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const { SIGN_IN } = ROUTES

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount () {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(SIGN_IN)
          }
        },
        () => this.props.history.push(SIGN_IN)
      )
    }

    componentWillUnmount () {
      this.listener()
    }

    render () {
      return (
        <AuthUserContext.Consumer>
          {authUser => 
            condition(authUser) ? <Component { ...this.props } /> : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return compose(
    withRouter,
    withFirebase)(WithAuthorization)
}

export default withAuthorization
