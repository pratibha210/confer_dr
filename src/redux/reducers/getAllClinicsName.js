export function getAllClinicsName(state = [], action) {
    switch (action.type) {
        case 'ALLCLINICS_NAME':
            //console.log(action.data); 
            return action.data
        default:
            return state
    }
}