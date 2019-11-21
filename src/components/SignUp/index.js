import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Form, Input, Button, Row, Col } from 'antd';

const SignUpPage = () => (
    <Row type="flex" justify="center">
        <Col span={8}>
            <h1 style={{'text-align': 'center'}}>SignUp</h1>
            <SignUpForm />
        </Col>
    </Row>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}
class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email
                    })
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <Form {...formItemLayout} onSubmit={this.onSubmit}>
                <Form.Item label="Username">
                    <Input
                        name="username"
                        value={username}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item label="Email Address">
                    <Input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                </Form.Item>
                <Form.Item label="Password">
                    <Input
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item label="Confirm Password">
                    <Input
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button disabled={isInvalid} type="primary" htmlType="submit">Sign Up</Button>
                </Form.Item>
                {error && <p>{error.message}</p>}
            </Form>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withFirebase,
    withRouter
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
