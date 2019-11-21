import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <AuthUserContext.Consumer>
        {authUser => <Header className="header">
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1">
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={ROUTES.HOME}>Home</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={ROUTES.ADMIN}>Admin</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    {authUser.email}
                </Menu.Item>
                <Menu.Item key="6">
                    <SignOutButton />
                </Menu.Item>
            </Menu>
        </Header>
        }
    </AuthUserContext.Consumer>
);

const NavigationNonAuth = () => (
    <Header className="header">
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">
                <Link to={ROUTES.LANDING}>Landing</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </Menu.Item>
        </Menu>
    </Header>
);

export default Navigation;
