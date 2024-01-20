


export function doseslist(state = [], action) {
    switch (action.type) {
        case 'DOSES_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}