export function showMedicine(state = [], action) {
    switch (action.type) {
        case 'SHOWMEDICATION_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}