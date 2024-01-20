

export function education(state = [], action) {
    switch (action.type) {
        case 'EDUCATION_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}