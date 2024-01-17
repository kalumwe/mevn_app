import { Validator } from 'vee-validate';

export default 
// Define a custom error message for the confirmed rule
Validator.localize('en', {
  custom: {
    confirmPassword: {
      confirmed: 'The passwords do not match.'
    },
    password: {
      regex: 'The passwords do not match. Must contain atleast a capital letter, number and special character'
    }
  }
});