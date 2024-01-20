


export function associateClinics(state = [], action) {
    switch (action.type) {
        case 'CLINICNAME_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}