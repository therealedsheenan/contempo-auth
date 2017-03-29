import React, { PropTypes } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

const NavComponent = (props) => {
  return (
    <Nav>
      <NavItem>
        <NavLink>
          <Link to='/home'>Home</Link>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink>
          <Link to='/style'>Styleguide</Link>
        </NavLink>
      </NavItem>
      { props.authentication.isAuthenticated &&
      <NavItem>
        <NavLink>
          <button onClick={props.logout}>Sign out</button>
        </NavLink>
      </NavItem> }
    </Nav>
  )
}

NavComponent.propTypes = {
  authentication: PropTypes.object
}

export default NavComponent
