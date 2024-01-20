
export function cityList(state = [], action) {
    switch (action.type) {
        case 'CITY_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}