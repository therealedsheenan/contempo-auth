import React from 'react'
import { Field, reduxForm } from 'redux-form'

const Login = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor='userName'>Username: </label>
        <Field name='username' component='input' type='text' />
      </div>
      <div>
        <label htmlFor='password'>password: </label>
        <Field name='password' component='input' type='password' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

Login.propTypes = {
  requestLogin: React.PropTypes.func
}

const LoginForm = reduxForm({
  form: 'login'
})(Login)

export default LoginForm
