import React from 'react';

import { Meteor } from 'meteor/meteor';

import { Row, Col } from 'react-flexbox-grid';

import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import FocusContainer from 'react-md/lib/Helpers/FocusContainer';

import { handleResult, getFieldValue } from '../../utils/client-utils';

/**
 * Class for sign in user
 *
 */
class SignInPage extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onGoogleAuth = this.onGoogleAuth.bind(this);
    }

    /**
     * Get values from form fields and sign in user
     *
     * @param {object} event Form submit event
     *
     * @return {void}
     */
    onSubmit(event) {
        event.preventDefault();

        const getFormFieldValue = getFieldValue(event.target);

        const email = getFormFieldValue('email');
        const password = getFormFieldValue('password');

        Meteor.loginWithPassword({email}, password, handleResult());
    }

    /**
     * Sign in user with google account
     *
     *
     * @return {void}
     */
    onGoogleAuth() {
        Meteor.loginWithGoogle();
    }


    render() {
        return (
            <div>
                <h1 className="text-center m-t-10">Sign In</h1>

                <Row>
                    <Col xs={12} md={6} mdOffset={3} sm={8} smOffset={2}>
                        <FocusContainer
                            focusOnMount
                            component="form"
                            className="md-grid"
                            onSubmit={this.onSubmit}
                        >
                            <TextField required id="email" type="email" label="Email"/>

                            <TextField required id="password" label="Password" type="password"/>

                            <Button
                                raised
                                primary
                                type="submit"
                                style={{ width: '100%', marginBottom: '10px', marginTop: '10px', }}
                                label="Submit"
                            />

                            <Button
                                raised
                                primary
                                onClick={this.onGoogleAuth}
                                style={{ width: '100%' }}
                                label="Login With Google"
                            />
                        </FocusContainer>

                    </Col>
                </Row>
            </div>
        );
    }
}


export default SignInPage;
