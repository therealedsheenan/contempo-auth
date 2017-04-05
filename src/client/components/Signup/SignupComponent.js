import React, {PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, FormGroup, Label, Container, Row, Col, Alert } from 'reactstrap'

const Signup = (props) => {
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
              <Label htmlFor='userEmail'>Email: </Label>
              <Field name='email' component='input' type='text' />
            </FormGroup>
            <FormGroup>
              <label htmlFor='password'>password: </label>
              <Field name='password' component='input' type='password' />
            </FormGroup>
            <Button type='submit'>Submit</Button>
          </Form>
        </Col>
      </Row>
      {props.success ? <Alert color='success'>User Successfully created.</Alert> : <Alert color='danger'>Sign up failed.</Alert>}
    </Container>
  )
}

Signup.propTypes = {
  handleSubmit: PropTypes.func,
  success: PropTypes.bool
}

const SignupForm = reduxForm({
  form: 'signup'
})(Signup)

export default SignupForm
