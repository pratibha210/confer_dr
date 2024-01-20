export function deleteMedicine(state = {}, action) {
    switch (action.type) {
        case 'DELETEMEDICATION_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}