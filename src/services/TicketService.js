import _ from "lodash";
import { httpRequest } from "../helpers/httpRequest";

export class TicketService {

    async getTicketsSmall(info) {
        const { response, error } = await httpRequest("GET", `/events/tickets/byEvent/${info.id}`, null, { "Authorization": info.token });
        console.log(response)
        if (!error) {
            let paterner=[];
            
            let array = _.map(response.data.data, (val, index) => {
                paterner= val.Event.PaymentMethods;
                return  {index: Number(index) + 1,fullName:val.fullName, email:val.email, phoneNumber:val.phoneNumber, nationalId:val.nationalId, price:val.price, sittingPlace:val.sittingPlace, status:val.status === 'not Attended' ? 'Absent':'Attended', type:val.EventPayment?val.EventPayment.name:'' }
            })

            return {ticket:array,paterner};
        }

    }

    async getTicketsEvents(info) {
        const { response, error } = await httpRequest("GET", `/events/user`, null, { "Authorization": info.token });
        if (!error) {
            let array = _.map(response.data.data, (val, index) => {
                return  {id: val.id,title:val.title, image:val.image[0]}
            })
            return array;
        }
        
    }
}