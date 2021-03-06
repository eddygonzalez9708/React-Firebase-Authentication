import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'

import * as ROUTES from '../../constants/routes'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInForm extends Component {
  constructor (props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault() 

    const { email, password } = this.state

    this.props.firebase 
      .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          this.props.history.push(ROUTES.HOME)
        })
        .catch(error => {
          this.setState({ error })
        })
  }

  render () {
    const { email, password, error } = this.state

    const isInvalid = email === '' || password === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <input
          name='password'
          value={password}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <button
          disabled={isInvalid}
          type='submit'>
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default compose(
  withRouter,
  withFirebase)(SignInForm)




