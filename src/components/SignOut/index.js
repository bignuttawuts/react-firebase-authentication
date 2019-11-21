import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class SignOutButton extends Component {
    render() {
        return (
            <span onClick={this.props.firebase.doSignOut}>
                Sign Out
            </span>
        )
    }
}

export default withFirebase(SignOutButton);
