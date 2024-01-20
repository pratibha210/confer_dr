



export function upcomming(state = [], action) {
    switch (action.type) {
        case 'UPCOMMINGAPPOINTMENT_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}