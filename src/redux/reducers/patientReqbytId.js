

export function patientReqbyId(state = [], action) {
    switch (action.type) {
        case 'PATIENTREQUEST_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}