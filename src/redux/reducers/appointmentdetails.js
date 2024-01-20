export function appointmentdetails(state = [], action) {
    switch (action.type) {
        case 'APPOINTMENT_DETAILS':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}