import React from 'react'
import PasswordChange from '../PasswordChange'
import { AuthUserContext, withAuthorization } from '../Session'

const condition = authUser => !!authUser

const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordChange />
      </div>
    )}
  </AuthUserContext.Consumer>
)

export default withAuthorization(condition)(Account)
