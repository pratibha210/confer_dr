
export function cityname(state = [], action) {
    switch (action.type) {
        case 'CITYNAME_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}