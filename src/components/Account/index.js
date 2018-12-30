import React from 'react'
import PasswordChange from '../PasswordChange'
import { AuthUserContext } from '../Session'

const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => {
      return (
        <div>
          <h1>Account: {authUser.email}</h1>
          <PasswordChange />
        </div>
      )
    }}
    </AuthUserContext.Consumer>
)

export default Account
