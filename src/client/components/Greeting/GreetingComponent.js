import React from 'react'
import {
  Title,
  SubTitle
} from './styles'

const GreetingComponent = (props) => {
  return (
    <div className='Greeting'>
      <button />
      <Title>Good {props.message}!</Title>
      <SubTitle>Welcome to contempo-auth!</SubTitle>
    </div>
  )
}

GreetingComponent.propTypes = {
  message: React.PropTypes.string
}

export default GreetingComponent
