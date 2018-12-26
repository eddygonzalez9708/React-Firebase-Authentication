import React from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'

const SignOut = ({ firebase }) => (
  <button
    type='button'
    onClick={firebase.doSignOut}>
    Sign Out 
  </button>
)

export default compose(
  withFirebase)(SignOut)