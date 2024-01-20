export function error(state = false, action) {
    switch (action.type) {
     case 'ERROR':
        return action.data   
     
        default:
       return state
   }
 }