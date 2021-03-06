import React, { Component } from 'react'
import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetForm extends Component {
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

    const { email } = this.state

    this.props.firebase
    .doPasswordReset(email)
    .then(() => {
      this.setState({ ...INITIAL_STATE })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  render () {
    const { email, error } = this.state

    const isInvalid = email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='email'
          value={this.state.email}
          onChange={this.onChange}
          type='text'
          placeholder='Email'
        />
        <button
          disabled={isInvalid}
          type='submit'>
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default withFirebase(PasswordForgetForm)
