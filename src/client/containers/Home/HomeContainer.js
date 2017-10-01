import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// redux
import { requestUsers } from '../../redux/users/actions'

// components
import GreetingComponent from '../../components/Greeting/GreetingComponent'

const HomeContainer = React.createClass({
  propTypes: {
    requestUsers: PropTypes.func.isRequired,
    greeting: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    users: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ])
  },
  componentDidMount () {
    this.props.requestUsers()
  },
  render () {
    return (
      <GreetingComponent
        message='Day'
        users={this.props.users} />
    )
  }
})

const mapStateToProps = ({usersReducer}) => {
  return {
    users: usersReducer.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUsers: () => dispatch(requestUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
