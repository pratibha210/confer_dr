
export function clinics(state = [], action) {
    switch (action.type) {
        case 'CLINICS_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}