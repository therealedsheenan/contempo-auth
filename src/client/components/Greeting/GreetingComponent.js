import React, { PropTypes } from 'react'
import {
  Title,
  SubTitle
} from './styles'

import { ListGroup, ListGroupItem } from 'reactstrap'

const GreetingComponent = (props) => {
  return (
    <div className='Greeting'>
      <Title>Good {props.message}!</Title>
      <SubTitle>Welcome to contempo-auth!</SubTitle>
      <h2>List of users</h2>
      {
        props.users.map(user => {
          return (
            <div key={user._id}>
              <ListGroup>
                <ListGroupItem>
                  <strong>email: </strong>{user.email}
                  <strong>&nbsp; useruame: </strong>{user.username}
                </ListGroupItem>
              </ListGroup>
            </div>
          )
        })
      }
    </div>
  )
}

GreetingComponent.propTypes = {
  message: PropTypes.string,
  users: PropTypes.array
}

export default GreetingComponent
