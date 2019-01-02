import React from 'react'
import { AuthUserContext, withAuthorization } from '../Session'

import PasswordChange from '../PasswordChange'

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
