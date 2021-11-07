export function validateContact(values) {
    let errors = {}

    if (!values.fullName.trim()) {
        errors.fullName = "Name is required"
    }
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.subject) {
        errors.subject = 'subject is required';
    }

    if (!values.message) {
        errors.message = 'message is required';
    } else if (values.message.length <15) {
        errors.message = 'length must have atleat 15 characters';
    }
    return errors;
}
