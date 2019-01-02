import React from 'react'

import { withAuthorization } from '../Session'

const condition = authUser => !!authUser

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>The Home Page is accessible by every signed in user.</p>     
  </div>
)

export default withAuthorization(condition)(Home)
