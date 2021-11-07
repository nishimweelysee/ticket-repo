export default function validateLoginInfo(values){
    let errors = {}

    if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } 

      return errors;
}