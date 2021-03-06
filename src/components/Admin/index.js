import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { withAuthorization } from '../Session'

import UserList from '../UserList'

/* Route strings imported */

import * as ROLES from '../../constants/roles'

const { ADMIN } = ROLES 

const condition = authUser => authUser && authUser.roles.includes(ADMIN)

class Admin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      users: []
    }
  }

  componentDidMount () {
    this.setState({ loading: true })
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val()

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }))
      this.setState({
        users: usersList,
        loading: false
      })
    })
  }

  componentWillUnmount () {
    this.props.firebase.users().off()
  }

  render () {
    const {
      users,
      loading
    } = this.state

    return (
      <div>
        <h1>Admin</h1>
        <p>Restricted area! Only users with the admin role are authorized.</p>
        {loading && <div>Loading...</div>}
        <UserList users={users} />
      </div>
    )
  }
}

export default compose(
  withAuthorization(condition),
  withFirebase
)(Admin)
