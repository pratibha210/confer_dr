// import { cityname } from "./reducers/cityname";
var moment = require('moment');

function specialization(data) {

  return {
    type: "SPECIALIZATION_LIST",
    data: data
  };
}
export function getSpecialization() {
  //////console.log("API")
  return dispatch => {
    const reqValues = {
      method: "GET",
      // headers: []
    };
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Specializations/list/", reqValues)

      .then(result =>
        // //////console.log(result))
        result.json())
      .then(result => {
        //////console.log(result);
        dispatch(specialization(result));
      })
      .catch(err => {
        //////console.log("Error", err);
      });
  };
}


// function gender(data) {

//   return {
//     type: "GENDER_LIST",
//     data: data
//   };
// }
// export function getgender() {
//   //////console.log("API")
//   return dispatch => {
//     const reqValues = {
//       method: "GET",
//       // headers: []
//     };
//     fetch(
//       "http://skrepository.com/restapi/Specializations/list/", reqValues)

//       .then(result =>
//         // //////console.log(result))
//         result.json())
//       .then(result => {
//         //////console.log(result);
//         dispatch(specialization(result));
//       })
//       .catch(err => {
//         //////console.log("Error", err);
//       });
//   };
// }


function state(data) {

  return {
    type: "STATE_LIST",
    data: data
  };
}
export function getstates() {
  //////console.log("API")
  return dispatch => {
    const reqValues = {
      method: "GET",

    };
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Market/getstate/", reqValues)

      .then(result =>
        result.json())
      .then(result => {
        //////console.log(result);
        dispatch(state(result));
      })
      .catch(err => {
        //////console.log("Error", err);
      });
  };
}

function education(data) {

  return {
    type: "EDUCATION_LIST",
    data: data
  };
}
export function geteducation() {
  //////console.log("API")
  return dispatch => {
    const reqValues = {
      method: "GET"
      // headers: {
      //   accept: "application/json"
      // }

    };
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Education/list/", reqValues)

      .then(result =>
        result.json())
      .then(result => {
        //////console.log(result);
        dispatch(education(result));
      })
      .catch(err => {
        //////console.log("Error", err);
      });
  };
}

// function signupform(data) {

//   return {
//     type: "SIGNUP_LIST",
//     data: data
//   };
// }

export function createuser(data, values, location, city) {
  //////console.log(data, values, location, city, "in order=data,values");
  return dispatch => {
    let formData = new FormData();

    formData.append("name", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("contactNo", data.phno);
    formData.append("gender", values.gender);
    formData.append("experience", values.experience);
    formData.append("specialization", values.specialization);
    formData.append("education", values.education);
    formData.append("state", values.state);
    formData.append("userTypeId", "2");
    formData.append("address", values.address);
    formData.append("city", city);
    formData.append("licenceid", values.licenceid);
    formData.append("remark", values.remark);
    formData.append("marketId", "2");
    formData.append("appId", "19");
    formData.append("createdBy", "1");
    formData.append("roleid", "10");

    for (var pair of formData.entries()) {
      //////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/User/create/", config)
      .then(result =>
        //  //////console.log(result))
        result.json())
      .then(result => {
        //////console.log(result);
        if (result.success === 1) {
          location.push("/Dashboard");
        }
        else {
          //////console.log("message: err");
        }
      })
      .catch(err => {
        //////console.log(err);
      });

  }
}
function userdetails(data) {
  return {
    type: 'LOGGED_USER_DETAILS',
    data: data
  };
}
export function loginUser(values, location) {
  //////console.log(values, location);
  return dispatch => {

    let formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);

    for (var pair of formData.entries()) {
      //////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }

    fetch(process.env.REACT_APP_apiurl + "/restapi/User/login/", config)
      .then(result => result.json())
      .then(result => {
        //////console.log(result);

        if (result.success === 1) {
          // location.push("/Dashboard");
          let formData = new FormData();

          formData.append("token", result.token);


          for (var pair of formData.entries()) {
            //////console.log(pair[0] + ', ' + pair[1]);
          }
          const config = {
            method: 'POST',
            body: formData,
          }
          fetch(
            process.env.REACT_APP_apiurl + "/restapi/User/getbytoken/", config)

            .then(user =>
              user.json())
            .then(user => {
              //////console.log(user);
              // var admin = { 'email': 'John','password':'123' };
              // localStorage.setItem('userid', '452');
              // localStorage.setItem('appId', '19');
              // localStorage.setItem('drid', '452');
              sessionStorage.setItem('token', result.token);
              // var object = localStorage.user;
              // if (user.user.role === "admin") {
              //   //////console.log("Admin working");
              //   localStorage.setItem("userdata", user.user.config);
              //////console.log(user);
              // dispatch(userdetails(user.user));
              dispatch(userdetails(user));

              location.push("/Dashboard");

            })

            .catch(err => {
              //////console.log("Error", err);
            });

        }
        else {
          //////console.log("message: err");

          dispatch(errorMessage(result.error.errormsg));
        }

      })

      .catch(err => {
        //////console.log("Error", err)
        dispatch(errorMessage(" Inavlid Password or Email !"));
      });

  }
}


function errorMessage(msg) {
  return {
    type: "ERROR",
    data: msg
  };
}

function clinics(data) {

  return {
    type: "CLINICS_LIST",
    data: data
  };
}

export function getclinics() {
  //////console.log("API")
  return dispatch => {
    const reqValues = {
      method: "GET",
      headers: {
        accept: "application/json"
      }

    };
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Clinic/getallclinics/", reqValues)

      .then(result =>
        result.json())
      .then(result => {
        //////console.log(result);
        // dispatch(clinics(result));
      })
      .catch(err => {
        //////console.log("Error", err);
      });
  };
}

function cityList(data) {

  return {
    type: "CITY_LIST",
    data: data
  };
}


export function getcitybystate(id) {
  //////console.log("API", id)
  // //////console.log(id)
  return dispatch => {
    let formData = new FormData();

    formData.append("state_name", id);

    for (var pair of formData.entries()) {
      //////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Market/getcitybystate/", config)

      .then(result =>
        result.json())
      .then(result => {
        //////console.log(result);
        dispatch(cityList(result.result));
      })
      .catch(err => {
        //////console.log("Error", err);
      });

  }

}


export function getphysicianclinic() {
  // //////console.log(id, "in order=data,values");
  return (dispatch, getState) => {
    let formData = new FormData();

    // formData.append("userid", getState().userdetails.id);
    formData.append("userid", getState().userdetails.id);

    for (var pair of formData.entries()) {
      //////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Physician/getphysicianclinic/", config)
      .then(result =>
        //  //////console.log(result))
        result.json())
      .then(result => {
        console.log(result);

        // let arr = [...getState().clinics]
        // arr.push(result.result)
        // dispatch(clinics(arr))
        dispatch(clinics(result.result))
      })
      .catch(err => {
        //////console.log(err);
      });

  }
}

function appointmentdetails(data) {

  return {
    type: "APPOINTMENT_DETAILS",
    data: data
  };
}
// Not needed anymore
export function getappointmentdetails(appid) {
  // //////console.log(id, "in order=data,values");
  return dispatch => {
    let formData = new FormData();

    formData.append("appid", appid);
    // "A20192650"


    for (var pair of formData.entries()) {
      //////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Appointments/getappointmentdetails/", config)
      .then(result =>
        //  //////console.log(result))
        result.json())
      .then(result => {
        //////console.log(result);
        // appointmentdetails.appid = sessionStorage.getItem('appid');
        // //////console.log('appid').value = appointmentdetails.appid
        sessionStorage.setItem("appid", appid);

        // //////console.log(x);
        dispatch(appointmentdetails(result.result))
      })
      .catch(err => {
        //////console.log(err);
      });

  }
}

function pastappointments(data) {

  return {
    type: "PASTAPPOINTMENT_LIST",
    data: data
  };
}
// }
export function getPastAppointments(id) {
  // //////console.log(id, "in order=data,values");
  var date = moment().format("YYYY-MM-DD")
  //////console.log(date)
  return (dispatch, getState) => {
    let formData = new FormData();

    formData.append("drid", getState().userdetails.id);
    formData.append("cdate", date);


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Appointments/getpastappointmentbydr/", config)
      .then(result =>
        //  ////console.log(result))
        result.json())
      .then(result => {
        ////console.log(result);
        if (result.success === 1) {
          dispatch(pastappointments(result.result))
        }
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}


function todaysappointments(data) {

  return {
    type: "TODAYSAPPOINTMENT_LIST",
    data: data
  };
}
// }
export function getTodaysAppointments(id) {
  // ////console.log(id, "in order=data,values");
  var date = moment().format("YYYY-MM-DD")
  ////console.log(date)
  return (dispatch, getState) => {
    let formData = new FormData();

    formData.append("drid", getState().userdetails.id);
    formData.append("cdate", date);


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
      header: [{
        "Content-Type": "application/json",
      }]
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Appointments/gettodayappointmentbydr/", config)
      .then(result =>
        //  ////console.log(result))
        result.json())
      .then(result => {
        ////console.log(result);
        // sessionStorage.setItem("drid", "452");
        // sessionStorage.setItem("cdate", "2019-04-10");
        if (result.success === 1) {
          dispatch(todaysappointments(result.result))
        }
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}

export function resetNotification(bool) {
  ////console.log("Reset notification to" + bool)
  return dispatch => {
    dispatch(clearNotification({ show: bool === "true" ? true : false }))
  }
}


function clearNotification(data) {
  return {
    type: 'CLEARED_LIST',
    data: data
  };
}
function upcomming(data) {

  return {
    type: 'UPCOMMINGAPPOINTMENT_LIST',
    data: data
  };
}



export function getfutureappointments(id) {
  // ////console.log(id, "in order=data,values");
  var date = moment().format("YYYY-MM-DD")
  ////console.log(date)
  return (dispatch, getState) => {
    let formData = new FormData();

    formData.append("drid", getState().userdetails.id);
    formData.append("cdate", date);


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
      header: [{
        "Content-Type": "application/json",
      }]
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Appointments/getfutureappointmentbydr/", config)
      .then(result =>
        //  ////console.log(result))
        result.json())
      .then(result => {
        // console.log(result);
        if (result.success === 1) {
          dispatch(upcomming(result.result))
        }
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}

export function cancelFutureAppointment(id) {
  ////console.log(id, "in cancel apptmnt");
  return (dispatch, getState) => {
    let formData = new FormData();

    formData.append("cancelid", id);
    // formData.append("cdate", '2019-04-10');


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
      header: [{
        "Content-Type": "application/json",
      }]
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Appointments/cancelappointmentbydr/", config)
      .then(result =>
        //  ////console.log(result))
        result.json())
      .then(result => {
        // console.log(result);
        ////console.log(getState())
        if (result.success === 1) {

          let futureApptList = [...getState().upcomming]
          // console.log(futureApptList);

          let index = futureApptList.findIndex(x => {
            return x.appid === id
          })

          futureApptList[index].status = "Cancelled"

          dispatch(upcomming(futureApptList))
        }
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}


// function fileupload(data) {

//   return {
//     type:"FILEUPLOAD_LIST",
//     data: data
//   };
// }
// export function getfileupload(values) {
//   // values:{
//   //   appid:"1234.,
//   //   category:"prescription",
//   //   path:"example"
//   // }
//   return dispatch => {
//     let formData = new FormData();

//     formData.append("appid", "A20192621345");
//     formData.append("category", "prescription");
//     formData.append("file", "icon.png");


//     for (var pair of formData.entries()) {
//       ////console.log(pair[0] + ', ' + pair[1]);
//     }
//     const config = {
//       method: 'POST',
//       body: formData,
//     }
//     fetch(process.env.REACT_APP_apiurl + "/restpi/Uploads/fileuploadtostorage/", config)
//       .then(result =>
//         //  ////console.log(result))
//         result.json())
//       .then(result => {
//         ////console.log(result);
//         //  dispatch(result)
//       })
//       .catch(err => {
//         ////console.log(err);
//       });

//   }
// }



export function getfileuploadtSorage(x, y, cdate, appid, uhid, pid, cid) {
  ////console.log(x, y, cdate)
  return dispatch => {
    let formData = new FormData();

    formData.append("appid", appid);
    formData.append("uhid", uhid);
    formData.append("pid", pid);
    formData.append("cid", cid);
    formData.append("Path", y);
    formData.append("category", x);
    formData.append("cdate", cdate);
    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Uploads/fileupload/", config)
      .then(result =>
        //  ////console.log(result))
        result.json())
      .then(result => {
        ////console.log(result);
        //  dispatch(result)
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}

// below action is not getting used

export function submitprescription(values) {
  ////console.log(values)
  return dispatch => {
    let formData = new FormData();

    formData.append("appid", "A20192650");
    formData.append("symptoms", values.symptoms);
    formData.append("diagnosis", values.diagnosis);
    formData.append("service_string", "Thyroid profile, CBC");
    formData.append("other_services", "Take rest");
    formData.append("nextdate", "05-02-2019");
    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Eprescription/addprescription/", config)
      .then(result =>
        //  ////console.log(result))
        result.json())
      .then(result => {
        ////console.log(result);
        //  dispatch(result)
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}



function doseslist(data) {

  return {
    type: 'DOSES_LIST',
    data: data
  };
}

export function getdosesList() {
  ////console.log("API")
  return dispatch => {
    const reqValues = {
      method: "GET",
      // headers: {
      //   accept: "application/json"
      // }

    };
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Dosages/getdosages/", reqValues)

      .then(result =>
        result.json())
      .then(result => {
        ////console.log(result);
        dispatch(doseslist(result.result));
      })
      .catch(err => {
        ////console.log("Error", err);
      });
  };
}


function medicines(data) {

  return {
    type: 'MEDICINE_LIST',
    data: data
  };
}

export function getmedicinelist() {
  ////console.log("API")
  return dispatch => {
    const reqValues = {
      method: "GET",
      headers: {
        accept: "application/json"
      }

    };
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Generic/getcommercial/", reqValues)

      .then(result =>
        result.json())
      .then(result => {
        ////console.log(result);
        dispatch(medicines(result.result));
      })
      .catch(err => {
        ////console.log("Error", err);
      });
  };
}

export function saveMedication(values, medicine, appId) {
  ////console.log(medicine)
  // ////console.log(id, "in order=data,values");
  return dispatch => {
    let formData = new FormData();

    formData.append("appid", appId);
    formData.append("commercialname", medicine.brand_name);
    formData.append("genericname", medicine.generic_name);
    formData.append("dosage", values.doses);
    formData.append("duration_number", values.n_days);
    formData.append("duration_dmy", values.duration_dmy);
    formData.append("timing", values.timing);

    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Eprescription/getmedication/", config)
      .then(result =>
        //  ////console.log(result))
        result.json())
      .then(result => {
        ////console.log(result);
        dispatch(saveMedicine(result.result))
        if (result.success === 1) {
          let formData = new FormData();

          formData.append("appid", appId);


          for (var pair of formData.entries()) {
            ////console.log(pair[0] + ', ' + pair[1]);
          }
          const config = {
            method: 'POST',
            body: formData,
          }
          fetch(
            process.env.REACT_APP_apiurl + "/restapi/Eprescription/showmedicationbyappid/", config

          )
            .then(
              result =>
                result.json()
            )
            .then(result => {
              ////console.log(result);
              dispatch(showMedicine(result.result))
            })

            .catch(err => {
              ////console.log(err);

            });
        }

        else {
          ////console.log("message: err");

        }
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}
function saveMedicine(data) {

  return {
    type: 'MEDICINES_LISTS',
    data: data
  };
}


function cityname(data) {
  ////console.log(data, "action")
  return {
    type: 'CITYNAME_LIST',
    data: data
  };
}
export function getcityname() {
  ////console.log("API")
  return dispatch => {
    const reqValues = {
      method: "GET",
    };
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Market/getcityofclinic/", reqValues)

      .then(result =>
        result.json())
      .then(result => {
        ////console.log(result);
        dispatch(cityname(result));
      })
      .catch(err => {
        ////console.log("Error", err);
      });
  };
}



function adddrRequest(data) {
  ////console.log(data, "action")
  return {
    type: 'DRREQUEST_LIST',
    data: data
  };
}

export function adddoctorrequest(x, y) {
  return dispatch => {
    let formData = new FormData();

    formData.append("pid", x);
    formData.append("clinicid", y);

    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Request/adddoctorrequest/", config)
      .then(result =>
        //  ////console.log(result))
        result.json())
      .then(result => {
        ////console.log(result);
        let data = {
          message: result.Message ? result.Message : result.errormsg,
          error: result.success ? false : true
        }
        dispatch(adddrRequest(data))
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}
export function clearMessage() {
  return dispatch => {
    dispatch(adddrRequest({}))
  }
}



function associateClinics(data) {
  ////console.log(data, "action")
  return {
    type: 'CLINICNAME_LIST',
    data: data
  };
}
export function getclinicname(x) {
  return dispatch => {
    let formData = new FormData();

    formData.append("name", x);

    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Request/getclinicname/", config)
      .then(result =>
        //  ////console.log(result))
        result.json())
      .then(result => {
        ////console.log(result);
        dispatch(associateClinics(result.result))
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}


export function resumesession(location) {
  // ////console.log(token);
  ////console.log(location);
  // id,location,
  return dispatch => {
    //resume session
    // location.push("/Dashboard");
    let formData = new FormData();

    formData.append("token", sessionStorage.getItem('token'));


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/User/getbytoken/", config

    )
      .then(
        result =>
          result.json()
      )
      .then(result => {
        ////console.log(result);
        if (result.success === 1) {
          location.push("/dashboard");
          dispatch(userdetails(result));
        }
        else if (result.success === 0) {
          location.push("/signin");
        }
      })

      .catch(err => {
        ////console.log(err);

      });

  };
}

function showMedicine(data) {
  ////console.log(data, "action")
  return {
    type: 'SHOWMEDICATION_LIST',
    data: data
  };
}

export function showMedication(appId) {
  ////console.log(appId);
  // ////console.log(location);
  // id,location,
  return (dispatch, getState) => {
    //resume session
    // location.push("/Dashboard");
    let formData = new FormData();

    formData.append("appid", appId);


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Eprescription/showmedicationbyappid/", config

    )
      .then(
        result =>
          result.json()
      )
      .then(result => {
        ////console.log(result);
        dispatch(showMedicine(result.result))


      })
      // })
      // })

      .catch(err => {
        ////console.log("Error", err);
        // dispatch(errorMessage(" Inavlid Password or Email !"));
      });

  }
}

// function deleteMedicine(data) {
//   ////console.log(data, "action")
//   return {
//     type: 'DELETEMEDICATION_LIST',
//     data: data
//   };
// }

export function deleteMedication(id, appId) {
//  console.log(id,appId);
  // ////console.log(location);
  // id,location,
  return dispatch => {
    //resume session
    // location.push("/Dashboard");
    let formData = new FormData();

    formData.append("deleteid", id);


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Eprescription/deletemedication/", config

    )
      .then(
        result =>
          result.json()
      )
      .then(result => {
        // console.log(result);

        // dispatch(deleteMedicine(result))

        if (result.success === 1) {
          let formData = new FormData();

          formData.append("appid", appId);


          for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
          }
          const config = {
            method: 'POST',
            body: formData,
          }
          fetch(
            process.env.REACT_APP_apiurl + "/restapi/Eprescription/showmedicationbyappid/", config

          )
            .then(
              result =>
                result.json()
            )
            .then(result => {
              // console.log(result);
              if(result.result){
              dispatch(showMedicine(result.result))
            }
            else{
              dispatch(showMedicine(''))
            }
            })
         
            .catch(err => {
              // console.log(err);

            });
        }

        else {
          // console.log("message: err");

        }

      })

      .catch(err => {
        console.log("Error", err);

      });

  }
}

export function editMedication(values, medicine, editId, appId) {
  ////console.log(medicine, values, editId, appId);
  // ////console.log(location);
  // id,location,
  return dispatch => {
    //resume session
    // location.push("/Dashboard");
    let formData = new FormData();

    formData.append("updateid", editId);
    formData.append("appid", appId);
    formData.append("updatecommercialname", medicine.brand_name);
    formData.append("updategenericname", medicine.generic_name);
    formData.append("updatedose", values.doses);
    formData.append("updateduration_number", values.n_days);
    formData.append("updateduration_dmy", values.duration_dmy);
    formData.append("updatetiming", values.timing);


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
    }
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Eprescription/updatemedicationbyid/", config

    )
      .then(
        result =>
          result.json()
      )
      .then(result => {
        ////console.log(result);
        // dispatch(showMedicine(result.result))

        if (result.success === 1) {
          let formData = new FormData();

          formData.append("appid", appId);


          for (var pair of formData.entries()) {
            ////console.log(pair[0] + ', ' + pair[1]);
          }
          const config = {
            method: 'POST',
            body: formData,
          }
          fetch(
            process.env.REACT_APP_apiurl + "/restapi/Eprescription/showmedicationbyappid/", config

          )
            .then(
              result =>
                result.json()
            )
            .then(result => {
              ////console.log(result);
              dispatch(showMedicine(result.result))
            })

            .catch(err => {
              ////console.log(err);

            });
        }

        else {
          ////console.log("message: err");

        }
      })

      .catch(err => {
        ////console.log("Error", err);

      });

  }
}

function clinicRequest(data) {
  ////console.log(data, "action..........");
  return {
    type: 'CLINICREQUEST_LIST',
    data: data
  };
}

export function getclinicRequest(id) {
  ////console.log(id, "userid");
  return (dispatch, getState) => {
    let formData = new FormData();

    formData.append("userid", id);


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
      header: [{
        "Content-Type": "application/json",
      }]
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Request/getclinicrequestdetails/", config)
      .then(result =>

        result.json())
      .then(result => {
        ////console.log(result);
        // sessionStorage.setItem("userid", "442");
        // sessionStorage.setItem("cdate", "2019-04-10");
        dispatch(clinicRequest(result.result))
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}



export function deleteClinicRequest(id) {

  return (dispatch, getState) => {
    let formData = new FormData();

    formData.append("deleteid", id);


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
      header: [{
        "Content-Type": "application/json",
      }]
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Request/deleteclinicrequest/", config)
      .then(result =>
        result.json())
      .then(result => {
        ////console.log(result);
        if (result.success === 1) {
          ////console.log(result, getState());
          var index = getState().clinicRequest.findIndex(x => x.id === id);
          let list = [...getState().clinicRequest];
          list.splice(index, 1);
          ////console.log(list, "list", Array.isArray(list));
          // let data = {
          //   // message: result.  
          //   Message: result.success ? false : true
          // }
          // list[index].accptid=[...list[index].id,obj]
          dispatch(clinicRequest(list));
        }
      })
      .catch(err => {
        ////console.log(err);
      });

  }
}

// function acceptRequest(data) {

//   return {
//     type: "ACCEPT_LIST",
//     data: data
//   };
// }


export function acceptClinicRequest(id) {
  ////console.log(id, "Array?")
  return (dispatch, getState) => {
    let formData = new FormData();

    formData.append("acceptid", id);

    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,
      header: [{
        "Content-Type": "application/json",
      }]
    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Request/acceptclinicrequest/", config)
      .then(result =>
        result.json())
      .then(result => {
        ////console.log(result);
        if (result.success === 1) {
          ////console.log(result, getState());
          var index = getState().clinicRequest.findIndex(x => x.id === id);
          let list = [...getState().clinicRequest];
          list.splice(index, 1);
          ////console.log(list, "list", Array.isArray(list));
          let data = {
            // message: result.  
            Message: result.success ? false : true
          }
          // list[index].accptid=[...list[index].id,obj]
          dispatch(clinicRequest(list, data));
        }
        // dispatch(addclinicRequest(result.result))
      })
      .catch(err => {
        ////console.log(err);
      });

  }

}

function getAllClinicsName(data) {

  return {
    type: "ALLCLINICS_NAME",
    data: data
  };
}
export function getAllClinicsToChoose() {
  ////console.log("API")
  return dispatch => {
    const reqValues = {
      method: "GET",
      // headers: []
    };
    fetch(
      process.env.REACT_APP_apiurl + "/restapi/Clinic/getallclinics/", reqValues)

      .then(result =>
        // ////console.log(result))
        result.json())
      .then(result => {
        ////console.log(result);
        dispatch(getAllClinicsName(result));
      })
      .catch(err => {
        ////console.log("Error", err);
      });
  };
}





function patientReqbyId(data) {

  return {
    type: "PATIENTREQUEST_LIST",
    data: data
  };
}
export function getPatientRequest(id) {
  ////console.log(id, "in order=data,values");
  return (dispatch, getState) => {
    let formData = new FormData();

    formData.append("drid", id);


    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,


    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Appointments/getpatientrequest/", config)
      .then(result =>
        //  //(result))
        result.json())
      .then(result => {
        //////console.log(result);

        dispatch(patientReqbyId(result.result))
      })
      .catch(err => {
        //////console.log(err);
      });

  }
}



////// API calling for get List of Leads ////////////
export function getLeads(id) {

  return (dispatch, getState) => {
    let formData = new FormData();

    formData.append("createdby", id);

    for (var pair of formData.entries()) {
      //////console.log(pair[0] + ', ' + pair[1]);
    }
    const config = {
      method: 'POST',
      body: formData,


    }
    fetch(process.env.REACT_APP_apiurl + "/restapi/Leads/getleadsdr/", config)
      .then(result =>
        //  //////console.log(result))
        result.json())
      .then(result => {
        //////console.log(result);
        if (result.success === 1) {
          //////console.log(result);
          dispatch(leadsList(result.result))
        }
        else {
          //////console.log("message: err");

          dispatch(errorMessage(result.errormsg));
        }

      })
      .catch(err => {
        //////console.log(err);
      });

  }
}


function leadsList(data) {
  return {
    type: "LEADS_LIST",
    data: data
  };
}

export function userUpdate(data) {
  //////console.log(data);
  return (dispatch, getState) => {
    dispatch(userdetails(data));
  }
}

////// API calling for priscriptiondata////////////

export function priscriptiondata(data) {
  //////console.log(data, "....");
  return (dispatch, getState) => {
    // let arr = [...getState().preData];
    // arr.push(data);
    dispatch(preData(data));

  }
}


function preData(data) {
  return {
    type: "PRE_DATA",
    data: data
  };
}
