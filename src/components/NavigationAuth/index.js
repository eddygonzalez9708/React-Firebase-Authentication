import React from 'react'
import { Link } from 'react-router-dom'

import SignOut from '../SignOut'

import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

const { 
 LANDING,
 HOME,
 ACCOUNT,
 ADMIN
} = ROUTES

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={LANDING}>Landing</Link>      
    </li>
    <li>
      <Link to={HOME}>Home</Link>      
    </li>
    <li>
      <Link to={ACCOUNT}>Account</Link>      
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <Link to={ADMIN}>Admin</Link>      
      </li>
    )}
    <li>
      <SignOut />
    </li>
  </ul>
)

export default NavigationAuth
