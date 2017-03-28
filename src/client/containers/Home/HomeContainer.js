import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// redux
import { requestGreeting } from '../../redux/modules/greeting'
import { getToken } from '../../redux/modules/auth'

// components
import GreetingComponent from '../../components/Greeting/GreetingComponent'

// base css
import 'styles/base.scss'

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
  },
  componentWillMount () {
  },
  render () {
    return (
      <GreetingComponent message={this.props.greeting.content} />
    )
  }
})

const mapStateToProps = ({greetingReducer}) => {
  let { fetching, greeting } = greetingReducer

  return {
    fetching: fetching,
    greeting: greeting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestGreeting: () => dispatch(requestGreeting()),
    requestLogin: () => dispatch(getToken())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
