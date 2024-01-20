export function acceptRequest(state = [], action) {
    switch (action.type) {
        case 'ACCEPT_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}