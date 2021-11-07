import cogoToast from "cogo-toast";
import moment from "moment";


export function validateEvent(values) {
    let errors = {}

    if (!values.title.trim()) {
        errors.title = "Event Title is required"
    }
    if (!values.host) {
        errors.host = 'Host is required';
    }
    if (!values.dateAndTimme) {
        errors.dateAndTimme = 'Date and Time is required';
    }else if(moment(values.dateAndTimme).isBefore()){
        errors.dateAndTimme="Date can't be is past";
    }

    if (!values.place) {
        errors.place = 'place is required';
    }
    if (!values.description) {
        errors.description = "description in required";
    }
    if (values.description.length <15) {
        errors.description = 'length must have atleat 15 characters';
    }
    if(values.numberofTicket==0){
        errors.numberofTicket="number of tickets to sell must be more than 1"
        cogoToast.error("number of tickets to sell must be more than 1");
    }
    if(!values.eventType){
        errors.eventType = "Event type is required";
    }
    if(!values.country){
        errors.country = "Country type is required";
    }
    if(values.image.length==0){
        errors.image = "Upload some Event Images, atleast 1";
        cogoToast.error("Upload some Event Images, atleast 1")
    }
    if(!values.startDate){
        errors.startDate = "Date to start buying ticket is required";
    }else if(moment(values.startDate).isAfter(values.dateAndTimme)){
        errors.startDate= "Start Date can't go beyond Event Date"
    }
    

    if(!values.endDate){
        errors.endDate = "Date to end buying ticket is required";
    }else if(values.endDate>values.dateAndTimme){
        errors.endDate= "End Date can't go beyond Event Date"
    }else if(values.endDate< new Date()){
        errors.endDate = "End Date can't be in Past";
    }

    if(values.startDate > values.endDate){
        errors.startDate = "The start Date can't be beyond the End Date";
    }
    

    return errors;
}


export function validateGrade(values){
    let errors = {};
    if(!values.name){
        errors.name = "Name is required";
    }
    return errors;
}

export function validateReceiver(values){
    let errors = {};
    if(!values.name){
        errors.name = "Name is required";
    }
    if(!values.value){
        errors.value = "Percentage Value required";
    }
    if(values.value <0 || values.value > 100){
        errors.value = "Percentage must be between 0 and 100";
    }
    if(!values.accNumber){
        errors.accNumber = "Account number is required";
    }else if(!/[0-9\\-]+$/.test(values.accNumber)){
        errors.accNumber = "Account number must be a number";
    }
    if(Object.keys(values.accName).length === 0){
        errors.accName = "Bank Account name  is required";
    }
    if(!values.phoneNumber){
        errors.phoneNumber = "Phone Number is required";
    }
    if(!values.email){
        errors.email = "Contact Email is Required";
    }
    
    return errors;
}

// export function validateRange(values){
//     let errors = {};
//     if(
//     return errors;
// }