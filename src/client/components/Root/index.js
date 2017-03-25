import React from 'react'
import { Link } from 'react-router-dom'

const Root = React.createClass({
  propTypes: {
    children: React.PropTypes.array
  },
  render () {
    return (
      <main>
        <Link to='/style'>Styleguide</Link> |
        <Link to='/login'>Login</Link>
        {this.props.children}
      </main>
    )
  }
})

export default Root
