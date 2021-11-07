export function validateInfo(values){
    let errors = {}

    if(!values.firstName.trim()){
        errors.firstName = "First name is required"
    }
    if(!values.lastName.trim()){
        errors.lastName = "last name is required"
    }
    if(!values.phoneNumber.trim()){
        errors.phoneNumber = "phone number required"
    }
    if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Password is required';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      return errors;
}

export function validatePassword(values){
  let errors = {}
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Password is required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}