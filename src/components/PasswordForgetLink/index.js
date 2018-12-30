import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const { PASSWORD_FORGET } = ROUTES

const PasswordForgetLink = () => (
  <p>
    <Link to={PASSWORD_FORGET}>Forget Password?</Link>
  </p>
)

export default PasswordForgetLink
