import React, { Component } from 'react'
import { withFirebase } from '../Firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import * as ROUTES from '../../constants/routes'

const INITIAL_STATE = {
  username: '', 
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    
    this.state = {...INITIAL_STATE}
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()

    const {
      username,
      email,
      passwordOne
    } = this.state

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          this.props.history.push(ROUTES.HOME)
        })
        .catch(error => {
          this.setState({ error })
        })
  }

  render () {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state
    
    const isInvalid = 
      username === '' ||
      email === '' ||
      passwordOne === '' ||
      passwordOne !== passwordTwo
  
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='username'
          value={username}
          onChange={this.onChange}
          type='text'
          placeholder='Full Name'
        />
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <input
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <input
          name='passwordTwo'
          value={passwordTwo}
          onChange={this.onChange}
          type='password'
          placeholder='Confirm Password'
        />
        <button disabled={isInvalid} type='submit'>Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default compose(
  withRouter,
  withFirebase)(SignUpForm)
