import React from 'react'
import { withAuthorization } from '../Session'

import * as ROLES from '../../constants/roles'

const { ADMIN } = ROLES 

const condition = authUser => authUser && authUser.roles.includes(ADMIN)

const Admin = () => (
  <div>
    <h1>Admin</h1>
    <p>Restricted area! Only users with the admin role are authorized.</p>      
  </div>
)

export default withAuthorization(condition)(Admin)
