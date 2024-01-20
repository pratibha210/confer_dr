// export function saveMedicine(values,medicine) {
//   // console.log(id, "in order=data,values");
//   return dispatch => {
//     let formData = new FormData();

//     formData.append("appid", "A20142637");
//     formData.append("commercialname", medicine.brand_name);
//     formData.append("genericname", medicine.generic_name);
//     formData.append("dosage", values.doses);
//     formData.append("duration_number", values.n_days);
//     formData.append("duration_dmy", values.days/month);
//     formData.append("Timing", values.time);



//     for (var pair of formData.entries()) {
//       console.log(pair[0] + ', ' + pair[1]);
//     }
//     const config = {
//       method: 'POST',
//       body: formData,
//       header: [{
//         "Content-Type": "application/json",
//       }]
//     }
//     fetch("http://www.skrepository.com/restapi/Eprescription/getmedication/", config)
//       .then(result =>
//         //  console.log(result))
//         result.json())
//       .then(result => {
//         console.log(result);
//         sessionStorage.setItem("appid", "A20142637");
//         sessionStorage.setItem("cdate", "2019-04-10");
//         dispatch(upcomming(result.result))
//       })
//       .catch(err => {
//         console.log(err);
//       });

//   }
// }