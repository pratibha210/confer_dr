export function prescriptiondetails(state = [], action) {
    switch (action.type) {
        case 'PRESCRIPTION_DETAILS':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}