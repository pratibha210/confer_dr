
import { combineReducers } from 'redux';

import { specialization } from './reducers/specialization';
import { state } from './reducers/state';
import { education } from './reducers/education';
import { error } from './reducers/error';
import { clinics } from './reducers/clinics';
import { userdetails } from './reducers/userdetails';
import { cityList } from './reducers/cityList';
import { appointmentdetails } from "./reducers/appointmentdetails";
import { prescriptiondetails } from "./reducers/prescriptiondetails";
import { pastappointments } from './reducers/pastappointments';
import { todaysappointments } from './reducers/todaysappointments';
import { upcomming } from './reducers/upcomming';
// import {fileupload} from './reducers/fileupload';
import { doseslist } from './reducers/doseslist';
import { medicines } from './reducers/medicines';
import { cityname } from './reducers/cityname';
import { associateClinics } from './reducers/associateClinics';
import { adddrRequest } from './reducers/adddrRequest';
import { saveMedicine } from './reducers/saveMedicine';
import { showMedicine } from './reducers/showMedicine';
import { deleteMedicine } from './reducers/deleteMedicine';
import { clinicRequest } from './reducers/clinicRequest';
import { acceptRequest } from './reducers/acceptRequest';
import { getAllClinicsName } from './reducers/getAllClinicsName';
import { appointmentReqbyId } from './reducers/appointmentReqbyId';
import { patientReqbyId } from './reducers/patientReqbytId';
import { clearNotification } from './reducers/clearNotification';
import {leadsList} from './reducers/leadsList';



const rootReducer = combineReducers({
   specialization,
   state,
   education,
   error,
   clinics,
   userdetails,
   cityList,
   appointmentdetails,
   prescriptiondetails,
   pastappointments,
   todaysappointments,
   upcomming,
   // fileupload,
   doseslist,
   medicines,
   cityname,
   associateClinics,
   adddrRequest,
   saveMedicine,
   showMedicine,
   deleteMedicine,
   clinicRequest,
   acceptRequest,
   getAllClinicsName,
   appointmentReqbyId,
   patientReqbyId,
   clearNotification,
   leadsList,
   
});


export default rootReducer;