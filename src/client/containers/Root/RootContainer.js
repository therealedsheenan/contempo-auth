import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getToken } from '../../redux/authentication/utils'
import { requestLoginSuccess, requestLogout } from '../../redux/authentication/actions'

// base css
import 'styles/base.scss'

const Root = React.createClass({
  propTypes: {
    children: PropTypes.array,
    getToken: PropTypes.func,
    requestLoginSuccess: PropTypes.func,
    requestLogout: PropTypes.func,
    authentication: PropTypes.object
  },
  componentDidMount () {
    if (getToken()) {
      this.props.requestLoginSuccess(getToken())
    }
  },
  checkToken () {
    let token = this.props.getToken()
    return token ? this.props.requestLoginSuccess(token) : false
  },
  logout () {
    this.props.requestLogout()
  },
  render () {
    return (
      <main>
        <Link to='/home'>Home</Link> |
        <Link to='/style'>Styleguide</Link>
        {this.props.authentication.isAuthenticated && <button onClick={this.logout}>Sign out</button> }
        {this.props.children}
      </main>
    )
  }
})

const mapStateToProps = ({ authReducer }) => {
  return {
    authentication: {
      isAuthenticating: authReducer.isAuthenticating,
      isAuthenticated: authReducer.isAuthenticated
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLoginSuccess: (token) => dispatch(requestLoginSuccess(token)),
    requestLogout: () => dispatch(requestLogout())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
