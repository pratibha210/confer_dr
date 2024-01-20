

export function clearNotification(state={show : true},action){
    switch (action.type){
        case 'CLEARED_LIST':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}