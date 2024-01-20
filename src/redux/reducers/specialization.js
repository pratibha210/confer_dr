

export function specialization(state = [], action) {
    switch (action.type) {
        case 'SPECIALIZATION_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}