import React, { Component } from 'react'
import { withFirebase } from '../Firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

const { HOME } = ROUTES
const { ADMIN } = ROLES

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
}

class SignUpForm extends Component {
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

    const {
      username,
      email,
      passwordOne,
      isAdmin
    } = this.state

    const roles = []

    if (isAdmin) {
      roles.push(ADMIN)
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.props.firebase
            .user(authUser.user.uid)
            .set({
              username,
              email,
              roles
            })
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          this.props.history.push(HOME)
        })
        .catch(error => {
          this.setState({ error })
        })
  }

  onChangeCheckbox = event => {
    this.setState({
      [event.target.name]: event.target.checked
    })
  }

  render () {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
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
        <label>
          Admin:
          <input 
            name='isAdmin'
            type='checkbox'
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <button disabled={isInvalid} type='submit'>Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default compose(
  withRouter,
  withFirebase)(SignUpForm)
