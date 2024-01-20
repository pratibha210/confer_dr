

export function pastappointments(state = [], action) {
    switch (action.type) {
        case 'PASTAPPOINTMENT_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}