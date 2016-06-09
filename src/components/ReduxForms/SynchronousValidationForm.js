import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar } from 'react-bootstrap';

export const fields = ['username', 'email'];

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

class SynchronousValidationForm extends Component { //eslint-disable-line
  render() {
    const { fields: { username, email }, resetForm, handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup
          controlId="username"
          validationState={username.error && username.touched ? 'error' : null}
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            placeholder="Username"
            name="username"
            {...username}
          />
          {username.touched && username.error &&
          (<div className="text-danger">{username.error}</div>)}
        </FormGroup>

        <FormGroup
          controlId="email1"
          validationState={email.error && email.touched ? 'error' : null}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            placeholder="Email"
            name="email"
            {...email}
          />
          {email.touched && email.error && <div className="text-danger">{email.error}</div>}
        </FormGroup>

        <ButtonToolbar>
          <Button bsStyle="primary" type="submit" disabled={submitting}>
            {submitting ? <i /> : <i />} Submit
          </Button>
          <Button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </Button>
        </ButtonToolbar>
      </form>

    );
  }
}

SynchronousValidationForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate
})(SynchronousValidationForm);
