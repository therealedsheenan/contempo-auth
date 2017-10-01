import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import NavComponent from '../../components/Navigation/NavComponent'

import { requestLoginSuccess, requestLogout } from '../../redux/authentication/actions'
import { getToken } from '../../redux/authentication/utils'

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
  logout () {
    this.props.requestLogout()
  },
  render () {
    return (
      <main>
        <NavComponent authentication={this.props.authentication} logout={this.logout} />
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
