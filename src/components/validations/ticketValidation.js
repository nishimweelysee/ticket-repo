export function validateTicket(values) {
    let errors = {};
    if (!values.fullName) {
        errors.fullName = "Name is required";
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = "Phone Number is required";
    }
    else if (values.phoneNumber.length != 13) {
        errors.phoneNumber = "Enter Valid length of phone number";
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.nationalId) {
        errors.nationalId = "National ID is required";
    }
    else if( values.nationalId.length == 6){
        errors.nationalId= "Passport format is 'PCXXXXXX'"
    }
    else if (!(values.nationalId.length==16 || values.nationalId.length==8)) {
        errors.nationalId = "National ID length must be 16 digit and 8 for Passport";
    }
    if(values.nationalId.length==16){
        if(!/[0-9]{16}/.test(values.nationalId)){
            errors.nationalId="National ID must Contains numbers only";
        }
    }
    if(values.nationalId.length==8){
        if(!/PC[0-9]{6}/.test(values.nationalId)){
            errors.nationalId = "Passport format is 'PCXXXXXX'"
        }
    }
    return errors;
}