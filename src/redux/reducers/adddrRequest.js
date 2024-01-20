
export function adddrRequest(state = {}, action) {
    switch (action.type) {
        case 'DRREQUEST_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}