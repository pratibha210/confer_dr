

export function medicines(state = [], action) {
    switch (action.type) {
        case 'MEDICINE_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}