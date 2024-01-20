export function appointmentReqbyId(state = [], action) {
    switch (action.type) {
        case 'APPOINTMENTREQ_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}