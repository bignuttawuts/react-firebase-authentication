import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class SignOutButton extends Component {
    render() {
        return (
            <button type="button" onClick={this.props.firebase.doSignOut}>
                Sign Out
            </button>
        )
    }
}

export default withFirebase(SignOutButton);
