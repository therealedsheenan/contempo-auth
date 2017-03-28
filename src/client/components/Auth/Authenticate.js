import React from 'react'
import { connect } from 'react-redux'

const AuthWrapper = (ComposedComponent) => {
  const Authentication = React.createClass({

    componentWillMount () {
      // if (!this.props.authenticated) {
      //   this.context.router.push('/');
      // }
    },

    componentWillUpdate (nextProps) {
      // if (!nextProps.authenticated) {
      //   this.context.router.push('/');
      // }
    },

    render () {
      return <ComposedComponent {...this.props} />
    }
  })

  function mapStateToProps ({authReducer}) {
    return { authenticated: authReducer.isAuthenticated }
  }

  return connect(mapStateToProps)(Authentication)
}

export default AuthWrapper
