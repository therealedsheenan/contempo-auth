import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import AuthService from '../../helpers/AuthService'

const auth = new AuthService()

const Root = React.createClass({
  propTypes: {
    children: React.PropTypes.array
  },
  render () {
    return (
      <main>
        {auth.isAuthenticated() && <button onClick={auth.logout()}>Logout</button>}
        <Link to='/style'>Styleguide</Link> |
        <Link to='/home'>Home</Link>
        {this.props.children}
      </main>
    )
  }
})

const signOut = (history) => {
  fakeAuth.signout(() =>
    <Redirect to={{
      pathname: '/'
    }} />
  )
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome!
      <button onClick={signOut(history)}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

export default Root
