import React from 'react'

import SignInForm from '../SignInForm'
import PasswordForgetLink from '../PasswordForgetLink'
import SignUpLink from '../SignUpLink'

const SignIn = () => (
  <div>
    <h1>SignIn</h1> 
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />   
  </div>
)

export default SignIn