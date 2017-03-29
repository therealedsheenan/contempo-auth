import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, FormGroup, Label, Container, Row, Col } from 'reactstrap'

const Login = (props) => {
  return (
    <Container>
      <Row>
        <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
          <Form onSubmit={props.handleSubmit}>
            <FormGroup>
              <Label htmlFor='userName'>Username: </Label>
              <Field name='username' component='input' type='text' />
            </FormGroup>
            <FormGroup>
              <label htmlFor='password'>password: </label>
              <Field name='password' component='input' type='password' />
            </FormGroup>
            <Button type='submit'>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

Login.propTypes = {
  requestLogin: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired
}

const LoginForm = reduxForm({
  form: 'login'
})(Login)

export default LoginForm
