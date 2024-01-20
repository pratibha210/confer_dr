
export function todaysappointments(state = [], action) {
    switch (action.type) {
        case 'TODAYSAPPOINTMENT_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}