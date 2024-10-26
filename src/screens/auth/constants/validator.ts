import {Validate} from '../../../utils/validate';

export const formValidator = (
  key: string,
  values: {email?: string; password?: string; confirmPassword?: string},
  errorMessage: any,
  setErrorMessage: (data: any) => void,
) => {
  const data = {...errorMessage};
  let message = '';

  switch (key) {
    case 'email':
      if (!values.email) {
        message = 'Email is required.';
      } else if (!Validate.Email(values.email)) {
        message = 'Invalid email address.';
      } else {
        message = '';
      }
      break;
    case 'password':
      if (!values.password) {
        message = 'Password is required.';
      } else if (!Validate.Password(values.password)) {
        message =
          'Password must be at least 8 characters, including uppercase, lowercase, number, and special character.';
      } else {
        message = '';
      }
      break;
    case 'confirmPassword':
      if (!values.confirmPassword) {
        message = 'Please enter your confirm password.';
      } else if (values.confirmPassword !== values.password) {
        message = 'Passwords do not match.';
      } else {
        message = '';
      }
      break;
    case 'useEmail':
      message = 'Email already in use. Try logging in instead.';
      break;
    case 'wrongPass':
      message = 'Invalid email or password. Please try again.';
      break;
    case 'delete':
      message = '';
      break;
  }

  if (message) {
    data[`${key}`] = message;
  } else {
    delete data[`${key}`];
  }

  setErrorMessage(data);
};
