import React from 'react'
import {
  Title,
  SubTitle
} from './styles'

import { ListGroup, ListGroupItem } from 'reactstrap'

const GreetingComponent = (props) => {
  console.log(props)
  return (
    <div className='Greeting'>
      <Title>Good {props.message}!</Title>
      <SubTitle>Welcome to contempo-auth!</SubTitle>
      {
        props.users.map(user => {
          return (
            <div key={user._id}>
              <h2>List of users</h2>
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
  message: React.PropTypes.string
}

export default GreetingComponent
