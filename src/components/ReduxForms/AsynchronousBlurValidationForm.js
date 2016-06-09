import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar } from 'react-bootstrap';

export const fields = ['username', 'password'];

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const asyncValidate = (values/* , dispatch */) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
        reject({ username: 'That username is taken' });
      } else {
        resolve();
      }
    }, 1000); // simulate server latency
  });

class AsynchronousBlurValidationForm extends Component { //eslint-disable-line
  render() {
    const {
      asyncValidating, fields: { username, password },
      resetForm, handleSubmit, submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup
          controlId="username1"
          validationState={username.error && username.touched ? 'error' : null}
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            placeholder="Username"
            name="username"
            {...username}
          />
          <FormControl.Feedback>
            <span>
              {asyncValidating === 'username' && <i className="fa fa-cog fa-spin fa-fw"/>}
            </span>
          </FormControl.Feedback>
          {username.touched && username.error &&
          (<div className="text-danger">{username.error}</div>)}
        </FormGroup>

        <FormGroup
          controlId="password"
          validationState={password.error && password.touched ? 'error' : null}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            placeholder="Password"
            name="password"
            {...password}
          />
          {password.touched && password.error &&
          (<div className="text-danger">{password.error}</div>)}
        </FormGroup>

        <ButtonToolbar>
          <Button bsStyle="primary" type="submit" disabled={submitting}>
            {submitting ? <i /> : <i />} Sign Up
          </Button>
          <Button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
}

AsynchronousBlurValidationForm.propTypes = {
  asyncValidating: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired
  ]),
  fields: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};


export default reduxForm({
  form: 'asynchronousBlurValidation',
  fields,
  asyncValidate,
  asyncBlurFields: ['username'],
  validate
})(AsynchronousBlurValidationForm);
