

export function clinicRequest(state = [], action) {
    switch (action.type) {
        case 'CLINICREQUEST_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}