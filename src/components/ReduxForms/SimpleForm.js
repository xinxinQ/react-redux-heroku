import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import {
  FormGroup, ControlLabel, FormControl,
  Button, ButtonToolbar, Radio, Checkbox
} from 'react-bootstrap';

export const fields =
  ['firstName', 'lastName', 'email', 'sex', 'favoriteColor', 'employed', 'notes'];

class SimpleForm extends Component { //eslint-disable-line
  render() {
    const {
      fields: { firstName, lastName, email, sex, favoriteColor, employed, notes },
      handleSubmit,
      resetForm,
      submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="fistname">
          <ControlLabel>First Name</ControlLabel>
          <FormControl type="text" placeholder="First Name" {...firstName}/>
        </FormGroup>

        <FormGroup controlId="lastname">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl type="text" placeholder="Last Name" {...lastName}/>
        </FormGroup>

        <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl type="text" placeholder="Email" {...email}/>
        </FormGroup>

        <FormGroup>
          <Radio inline {...sex} value="male" checked={sex.value === 'male'}>
            Male
          </Radio>
          <Radio inline {...sex} value="female" checked={sex.value === 'female'}>
            Female
          </Radio>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Favorite Color</ControlLabel>
          <FormControl
            componentClass="select"
            {...favoriteColor}
            // required syntax for reset form to work
            // undefined will not change value to first empty option
            // when resetting
            value={favoriteColor.value || ''}
          >
            <option></option>
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </FormControl>
        </FormGroup>

        <FormGroup>
          <Checkbox inline {...employed}>
            Employed
          </Checkbox>
        </FormGroup>

        <FormGroup controlId="notes">
          <ControlLabel>Notes</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Notes"
            {...notes}
            // required for reset form to work (only on textarea's)
            // see: https://github.com/facebook/react/issues/2533
            value={notes.value || ''}
          />
        </FormGroup>

        <ButtonToolbar>
          <Button type="submit" bsStyle="primary" disabled={submitting}>
            {submitting ? <i /> : <i />} Submit
          </Button>
          <Button disabled={submitting} onClick={resetForm}>
            Clear Values
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
}

SimpleForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'simple',
  fields
})(SimpleForm);
