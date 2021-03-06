import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  handleFormSubmit(formProps){
    // call action creator to sign-up the user
    this.props.signupUser(formProps);
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} className="form-control" type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password Confirm:</label>
          <input {...passwordConfirm} className="form-control" type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="button btn-primary">Sign Up</button>
      </form>
    );
  }

}

function validate(formProps){
  const errors = {};
  if (!formProps.email){
    errors.email = 'Please enter an email';
  }
  if (!formProps.password){
    errors.password = 'Please enter a password';
  }
  if (!formProps.passwordConfirm){
    errors.passwordConfirm = 'Please confirm password';
  }
  if (formProps.password != formProps.passwordConfirm){
    errors.password = 'Passwords not match';
  }
  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
