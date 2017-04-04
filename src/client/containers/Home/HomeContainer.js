import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// redux
import { requestGreeting } from '../../redux/greeting/actions'
import { getToken } from '../../redux/authentication/actions'
import { requestUsers } from '../../redux/users/actions'

// components
import GreetingComponent from '../../components/Greeting/GreetingComponent'

const HomeContainer = React.createClass({
  propTypes: {
    requestGreeting: PropTypes.func.isRequired,
    greeting: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  },
  componentDidMount () {
    // TODO check if user is authenticated
    this.props.requestGreeting()
    this.props.requestUsers()
  },
  componentWillMount () {
  },
  render () {
    return (
      <GreetingComponent
        message={this.props.greeting.content}
        users={this.props.users} />
    )
  }
})

const mapStateToProps = ({greetingReducer, usersReducer}) => {
  return {
    fetching: greetingReducer.fetching,
    greeting: greetingReducer.greeting,
    users: usersReducer.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestGreeting: () => dispatch(requestGreeting()),
    requestLogin: () => dispatch(getToken()),
    requestUsers: () => dispatch(requestUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
