


export function saveMedicine(state = [], action) {
    switch (action.type) {
        case 'MEDICINES_LISTS':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}