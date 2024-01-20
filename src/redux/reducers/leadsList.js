
export function leadsList(state = [], action) {
    switch (action.type) {
        case 'LEADS_LIST':
        //console.log(action.data)
            return action.data
        default:
            return state
    }
}