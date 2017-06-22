import React from 'react';

import { Accounts } from 'meteor/accounts-base';

import { Row, Col } from 'react-flexbox-grid';

import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import FocusContainer from 'react-md/lib/Helpers/FocusContainer';

import { handleResult, getFieldValue } from '../../utils/client-utils';

/**
 * Class for registraion user
 *
 */
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
 * Get values from form fields and create user acoount
 *
 * @param {object} event Form submit event
 *     
 * @return {void} 
 */
  onSubmit(event) {
    event.preventDefault();

    const getFormFieldValue = getFieldValue(event.target);

    const email = getFormFieldValue('email');
    const username = getFormFieldValue('username');
    const password = getFormFieldValue('password');

    Accounts.createUser({ username, email, password }, handleResult());
  }

  render() {
    return (
      <div>
        <h1 className="text-center m-t-10">Sign Up</h1>

        <Row>
          <Col xs={12} md={6} mdOffset={3} sm={8} smOffset={2}>
            <FocusContainer
              focusOnMount
              component="form"
              className="md-grid"
              onSubmit={this.onSubmit}
            >
              <TextField required id="email" type="email" label="Email" />

              <TextField required id="username" label="Username" />

              <TextField required id="password" label="Password" type="password" />

              <Button
                raised
                primary
                type="submit"
                label="Submit"
              />
            </FocusContainer>
          </Col>
        </Row>
      </div>
    );
  }
}


export default SignUpPage;