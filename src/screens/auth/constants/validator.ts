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
        message = 'Email là bắt buộc.';
      } else if (!Validate.Email(values.email)) {
        message = 'Địa chỉ email không hợp lệ.';
      } else {
        message = '';
      }
      break;
    case 'password':
      if (!values.password) {
        message = 'Mật khẩu là bắt buộc.';
      } else if (!Validate.Password(values.password)) {
        message =
          'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';
      } else {
        message = '';
      }
      break;
    case 'confirmPassword':
      if (!values.confirmPassword) {
        message = 'Vui lòng nhập lại mật khẩu.';
      } else if (values.confirmPassword !== values.password) {
        message = 'Mật khẩu không khớp.';
      } else {
        message = '';
      }
      break;
    case 'useEmail':
      message = 'Email đã được sử dụng. Hãy thử đăng nhập thay vì đăng ký.';
      break;
    case 'wrongPass':
      message = 'Email hoặc mật khẩu không chính xác. Vui lòng thử lại.';
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
