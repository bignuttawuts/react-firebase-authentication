import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Form, Input, Button, Row, Col } from 'antd';

import './signIn.css';

const SignInPage = () => (
  <Row type="flex" justify="center">
    <Col span={6}>
      <h1 style={{'text-align': 'center'}}>Sign in</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </Col>
  </Row>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error })
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (

      <Form onSubmit={this.onSubmit} id="components-form-demo-normal-login" className="login-form">
        <Form.Item>
          <Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Button disabled={isInvalid} type="primary" htmlType="submit" className="login-form-button">
          Sign in
        </Button>

        {error && <p>{error.message}</p>}
      </Form>

    )
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
