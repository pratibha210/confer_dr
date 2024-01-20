

export function state(state = [], action) {
    switch (action.type) {
        case 'STATE_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}