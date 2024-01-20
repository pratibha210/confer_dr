import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./AppointmentDetails.css";
import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  Tabs,
  Row,
  Col,
  Avatar,
  Badge,
  Select,
  Upload,
  message
} from "antd";
import { NavLink } from "react-router-dom";
import approveclinics from "../../images/Approve-Clinics.png";
// import enhance from '../../images/enhance.jpg';
import confirmsign from "../../images/Appoitment-confirmed.png";
import dateimg from "../../images/Date.png";
import timeimg from "../../images/Time.png";
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import openNotificationWithIcon from '../../Common/UiComponent/AlertComponent';
// import Moment from 'moment';
// const initialMoment = Moment();
const TabPane = Tabs.TabPane;
const Option = Select.Option;
// var cdate = new Date();
// var dd = String(cdate.getDate()).padStart(2, "0");
// var mm = String(cdate.getMonth() + 1).padStart(2, "0"); //January is 0!
// var yyyy = cdate.getFullYear();
var moment = require('moment');
// var pdfmake = require('pdfmake');

var pdfmake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfmake.vfs = pdfFonts.pdfMake.vfs;

function handleChange(value) {
  //console.log(`selected ${value}`);
}

function handleBlur() {
  //console.log("blur");
}

function handleFocus() {
  //console.log("focus");
}
class AppointmentDetails extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      path: "",
      cdate: "",
      uploaded: "",
      appointmentList: [],
      formFillData: {},
      showPDFbutton: false,
      fileList: [],
      pdfMedicationData: [],
      preStatus: "",
      // showPDFButtons: {}
      visible: false
    };
  }
  handleClick = e => {
    //console.log(e);
    this.setState({
      showPDFbutton: this.props.preData.length > 0 ? true : false,
    });
  };

  // handleCancel = e => {
  //   //console.log("79", e);
  //   this.setState({
  //     visible: false,
  //   });
  // };


  handleChangecategory = value => {
    //console.log(value);
    this.setState({
      category: value,
      reportChosen: true
    });
  };

  componentDidMount() {
    //console.log(this.props.preData);
    //console.log(this.props);
    // console.log(this.props.location.data);
    if (this.props.location.data && this.props.location.data.status === "Completed") {

      this.setState({ showPDFbutton: true })
    }
    else {
      this.setState({ showPDFbutton: false })
    }
    if (!this.props.location.data) {
      //console.log("apptmntdtls.length===0");
      this.props.history.push("/dashboard");
    } else {
      //console.log(this.props.location.data);

      //console.log("IN appointment");
      //console.log(this.props.appointmentdetails);



      // if (this.props.location.from === "formfill") {
      let formData = new FormData();

      formData.append("appid", this.props.location.data.appid);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const config = {
        method: "POST",
        body: formData
      };
      fetch(
        process.env.REACT_APP_apiurl +
        "/restapi/Eprescription/getprescriptiondetails/",
        config
      )
        .then(result =>
          //  //console.log(result))
          result.json()
        )
        .then(result => {
          console.log(result);
          if (result.success === 1) {
            this.setState({
              showPDFbutton: true,
              PDFdata: result.result
            });
            // this.props.actions.priscriptiondata(this.state.PDFdata);
            // this.setState(prevState => {
            //   let showButtons = { ...prevState.showButtons };

            //   showButtons = "false";

            //   return { showButtons };
            // }, () => //console.log(this.state.showButtons, ">>>>>>>>>126"))


          }

          else {
            this.setState({message: "Error"})
            // message.error(
            //   "Prescriptiondetails could not be fetched; please check your connection."
            // );
          }



        })
        .catch(err => {
          //console.log(err);
        });
      // }
    }
  }

  redirect = e => {
    //console.log("redirect");
    // e.preventDefault();
    //console.log(e);

    //console.log(this.props.appointmentdetails);
    this.props.history.push({
      pathname: "/dashboard/formfill",
      data: this.props.location.data
    });
  };

  onChange = e => {
    if (this.state.category.length === 0) {
      alert("Please choose a cotegory first");
    } else {
      //console.log(e);
      if (e.file.status === "error") {
        let formData = new FormData();
        formData.append("appid", this.props.location.data.appid);
        formData.append("category", this.state.category);
        formData.append("file", e.file.originFileObj);

        for (var pair of formData.entries()) {
          //console.log(pair[0], pair[1]);
        }
        const config = {
          method: "POST",
          body: formData
        };
        fetch(
          process.env.REACT_APP_apiurl +
          "/restapi/Uploads/fileuploadtostorage/",
          config
        )
          .then(result => result.json())
          .then(result => {
            //console.log(result);
            if (result.success === 1) {
              // message.success("File upload successfully");
              this.setState({
                path: result.Path
              });
              this.setState(
                ({ fileList: e.file.originFileObj.name })

              )
            } else {
              message.error("File upload failed");
            }
          })
          .catch(err => {
            message.error("File upload failed", err);
            //console.log(err);
          });
      }
    }
  };
  submit = () => {
    let cdate = moment().format("MM/DD/YYYY")
    //   mm + "/" + dd + "/" + yyyy;
    //console.log(cdate);

    //console.log(this.state.category, this.state.path, cdate);
    if (this.state.reportChosen === true && this.state.path.length > 0) {
      //   this.props.actions.getfileuploadtSorage(
      //     this.state.category,
      //     this.state.path,
      //     cdate,
      //     this.props.location.data.appid,
      //     this.props.location.data.uhid,
      //     this.props.location.data.pid,
      //     this.props.location.data.clinicid
      //   );

      let formData = new FormData();

      formData.append("appid", this.props.location.data.appid);
      formData.append("uhid", this.props.location.data.uhid);
      formData.append("pid", this.props.location.data.pid);
      formData.append("cid", this.props.location.data.clinicid);
      formData.append("Path", this.state.path);
      formData.append("category", this.state.category);
      formData.append("cdate", cdate);
      for (var pair of formData.entries()) {
        //console.log(pair[0] + ', ' + pair[1]);
      }
      const config = {
        method: 'POST',
        body: formData,
      }
      fetch(process.env.REACT_APP_apiurl + "/restapi/Uploads/fileupload/", config)
        .then(result =>
          //  //console.log(result))
          result.json())
        .then(result => {
          //console.log(result);
          //  dispatch(result)

          if (result.success === 1) {
            openNotificationWithIcon('success','Document uploaded successfully!!');
            
            this.setState({
              fileList: [],
              path: "",
            })
          }


          else {
            openNotificationWithIcon('error',"Document uploaded failed,please check connection or contact admin")
          }
          // this.setState({fileList:[]})
        })
        .catch(err => {
          //console.log(err);
        });



    } else {
      openNotificationWithIcon('error',"Please select a category and a file to upload");
    }
    // this.setState({

    // })
  };

  generatePDF = () => {

    let formData = new FormData();

    formData.append("appid", this.props.location.data.appid);


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
        // console.log(result, ">>>>>>>>>>>>>,PDFdatamedications");
        if(result.success===1){
          this.setState({
            pdfMedicationData: result.result
          }
          )
          // console.log(this.state.pdfMedicationData, ">>>>>>>>>>>>>,PDFdatalists")
        }
        else{
        this.setState({
          pdfMedicationData:[]
        }
        )
        // console.log(this.state.pdfMedicationData, ">>>>>>>>>>>>>,PDFdatalists")
      }
     
        //console.log(this.props.location.data, "patientData>>>")
        //console.log(this.props.userdetails, "docData>>>")
        var fonts = {
          Roboto: {
            normal: 'fonts/Roboto-Regular.ttf',
            bold: 'fonts/Roboto-Medium.ttf',
            italics: 'fonts/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto-MediumItalic.ttf'
          }
        };


        var rowArray = [[{ text: 'Commercial Name', style: 'tableHeader', bold: true }, { text: 'Generic Name(Dosage/Duration/Timing)', style: 'tableHeader', bold: true }],];
        // if (this.state.pdfMedicationData.length<0) {
          for (let i = 0; i < this.state.pdfMedicationData.length; i++) {
            let intermediateArray = [];
            intermediateArray.push(this.state.pdfMedicationData[i].commercialname, this.state.pdfMedicationData[i].genericname + " ( " + this.state.pdfMedicationData[i].dosage + " / " + this.state.pdfMedicationData[i].duration_number + " / " + this.state.pdfMedicationData[i].timing + ")")

            rowArray.push(intermediateArray)

          }
        // }
        // else {
        //   rowArray.push([])
        // }



        // pdfmake.setFonts(fonts);


        var docDefinition = {

          // header: 'simple text',

          // footer: {
          //   columns: [
          //     'Left part',
          //     { text: 'Right part', alignment: 'right' }
          //   ]
          // },

          content: [
            {
              text: [
                { text: ' ', style: 'tableHeader', fontSize: 15, bold: true, marginBottom: 50, paddingBottom: 50 }, "\n\n\n\n\n"

              ]
            },
            {
              alignment: 'justify',
              columns: [
                // {
                //   text: [
                //     {text:''},"\n\n\n\n\n\n\n",
                //   ]

                // },


                {


                  text: [
                    //  "DOCTOR DETAILS"
                    // { text: 'DOCTOR DETAILS\n', fontSize: 15, bold: true },
                    { text: 'DOCTOR DETAILS\n', fontSize: 15, bold: true },
                    { text: 'Name : ', fontSize: 15, bold: true }, this.props.location.data.phyname, "\n",
                    { text: 'Registration No. : ', fontSize: 15, bold: true }, this.props.userdetails.id, "\n",
                    { text: 'Specialisation : ', fontSize: 15, bold: true }, this.props.location.data.specializations, "\n",
                    { text: 'Education : ', fontSize: 15, bold: true }, this.props.location.data.education, "\n",

                  ]



                },
                {
                  text: [
                    //  "Patient DETAILS"

                    { text: 'PATIENT DETAILS\n', fontSize: 15, bold: true },
                    { text: 'Name : ', fontSize: 15, bold: true }, this.props.location.data.patientname, "\n",
                    { text: 'Appointment Id : ', fontSize: 15, bold: true }, this.props.location.data.appid, "\n",
                    { text: 'Patient Id : ', fontSize: 15, bold: true }, this.props.location.data.patientid, "\n",
                    { text: 'Date : ', fontSize: 15, bold: true }, this.props.location.data.appdate, "\n",
                    { text: 'Patient Age : ', fontSize: 15, bold: true }, this.props.location.data.patientage, "\n",
                    { text: 'Patient Gender : ', fontSize: 15, bold: true }, this.props.location.data.patientgender, "\n",

                  ]
                },

                // adding pratibha ///  


              ]
            }, "\n\n",

            {

              text: [
                { text: 'SYMPTOMS : ', fontSize: 15, bold: true }, this.state.PDFdata[0].symptoms, "\n\n"

              ]
            },
            {
              text: [
                { text: 'DIAGNOSIS : ', fontSize: 15, bold: true }, this.state.PDFdata[0].diagnosis, "\n\n"
              ]
            },

            { text: 'MEDICATION', style: 'header', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },

            {
              style: 'tableExample',
              table: {
                headerRows: 1,
                // body: [

                //   [{ text: 'Commercial Name', style: 'tableHeader', bold: true }, { text: 'Generic Name(Dosage/Duration/Timing)', style: 'tableHeader', bold: true }],
                //   // const content = x => {
                //   // return(
                //   [this.state.pdfMedicationData[0].commercialname, this.state.pdfMedicationData[0].genericname + " ( " + this.state.pdfMedicationData[0].dosage + " / " + this.state.pdfMedicationData[0].duration_number + " / " + this.state.pdfMedicationData[0].timing + ")"]


                // ]
                body: rowArray
              },
              layout: 'MEDICATION'
              // layout: {
              //   hLineWidth: function (i, node) {
              //     if (i === 0 || i === node.table.body.length) {
              //       return 0;
              //     }
              //     return (i === node.table.headerRows) ? 2 : 1;
              //   },
              //   vLineWidth: function (i) {
              //     return 0;
              //   },
              //   hLineColor: function (i) {
              //     return i === 1 ? 'black' : '#aaa';
              //   },
              //   paddingLeft: function (i) {
              //     return i === 0 ? 0 : 8;
              //   },
              //   paddingRight: function (i, node) {
              //     return (i === node.table.widths.length - 1) ? 0 : 8;
              //   }
              // }


            }, "\n\n\n",

            {
              text: [
                { text: 'RECOMMENDATION : ', fontSize: 15, bold: true }, this.state.PDFdata[0].service_details + "  " + this.state.PDFdata[0].others, "\n\n\n\n\n\n\n\n\n"
              ]
            },
            {
              alignment: 'justify',
              columns: [
                {
                  text: [
                    { text: 'Follow-up Date : ', fontSize: 15, bold: true }, this.state.PDFdata[0].followupdt, "\n\n\n",

                  ]
                },

                {
                  text: [
                    this.props.location.data.phyname, "\n",
                    this.props.location.data.specializations

                  ]
                },
              ]
            }, "\n\n\n",
            { text: 'Access the app conferkare.com for availing healthcare service anywhere, anytime .' }
          ]
        }

        // doc definition ends

        // var pdf = pdfmake.createPdf(docDefinition);
        pdfmake.createPdf(docDefinition).open()
        // ([this.state.pdfMedicationData.appid]);

        this.setState({
          showPDFbutton: false
        })

        // pdf.write(this.props.location.data.patientid+"/"+this.props.location.data.appdate+'.pdf');


      })


      .catch(err => {
        //console.log("Error", err);

      });



  }

  render() {
    return (
      <div className="conferdr">
        <div className="sectionnamePart appointmentdetailsection fordesktopversion">
          {/* <div className="fordesktop"> */}
          <NavLink to="/dashboard">
            <Icon type="left" className="arrow_back hidden-lg" />
            <span className="titlename">Appointment Details</span>
          </NavLink>
          {/* </div> */}
          <div className="confirmation_detail">
            <img src={confirmsign} className="confirmsignimg" alt={"confirm"} />
            <p className="confirmmsg">Appointment Confirmed</p>
            <p className="confirmclinic">
              Clinic Name :{" "}
              {this.props.location.data && this.props.location.data.clinicname}
            </p>
          </div>
          <div className="middlecarddetail">
            <Card bordered={false} style={{ width: 325 }}>
              <Row gutter={16}>
                <Col span={4}>
                  <div className="cardprofileimg">
                    <div className="cardprofileleftprt">
                      <span>
                        <Badge dot>
                          <Avatar shape="circle" icon="user" />
                        </Badge>
                      </span>
                    </div>
                  </div>
                </Col>
                <Col span={19}>
                  <p className="usernametext">
                    {this.props.location.data &&
                      this.props.location.data.patientname}
                  </p>
                  <p className="userid">
                    Id :{" "}
                    {this.props.location.data && this.props.location.data.appid}
                  </p>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
        <div className="datetimecard">
          <Card bordered={true} style={{ width: 325 }}>
            <Row gutter={16}>
              <Col span={3}>
                <div className="cardprofileimg">
                  <div className="carddateiconleftprt">
                    <img src={dateimg} className="dateimg" />
                  </div>
                </div>
              </Col>
              <Col span={20}>
                <p className="datetimeinfo">
                  {this.props.location.data &&
                    this.props.location.data.dayslist +
                    "" +
                    this.props.location.data.createdDt}
                </p>
              </Col>
            </Row>
          </Card>
          <Card bordered={true} style={{ width: 325 }}>
            <Row gutter={16}>
              <Col span={3}>
                <div className="cardprofileimg">
                  <div className="carddateiconleftprt">
                    <img src={timeimg} className="dateimg" />
                  </div>
                </div>
              </Col>
              <Col span={20}>
                <p className="datetimeinfo">10:00AM - 11:30AM field?</p>
              </Col>
            </Row>
          </Card>

          <div className="formbtnpres">
            {this.props.location && this.props.location.status !== "future" && (
              <Button
                type="primary"
                className="eprescrptionbtn"
                onClick={this.redirect}
              > {"ePrescription"}

              </Button>
            )}


            {this.state.showPDFbutton === true && this.state.PDFdata && (
              <Button type="primary" className="eprescrptionbtn" onClick={this.generatePDF}>
                Download PDF
              </Button>
            )

              //  {/* onClick={this.redirect} */}
            }
          </div>
        </div>

        <div className="centeralignprob">
          <div className="selectcategory">
            <Select
              className=""
              placeholder="Select a Category"
              optionFilterProp="children"
              onChange={this.handleChangecategory}
              onFocus={handleFocus}
              onBlur={handleBlur}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="prescription">prescription</Option>
              <Option value="pathologyReport">pathology report</Option>
              <Option value="radiologyReport">radiology report</Option>
              <Option value="medicalCertificate"> medical certificate</Option>
            </Select>
          </div>
          <div className="fileupload-section">

            {this.state.category.length > 0 && (
              <Upload onChange={this.onChange} showUploadList={false}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button choosefilebtn"
                  style={{ marginTop: "0" }}
                >
                  Choose File

                </Button>

              </Upload>
            )}
            <div>
              <p className="nofiletext">
                {" "}
                {this.state.category.length > 0
                  ? this.state.fileList == "" ? "No File Choosen" :

                    <span>{this.state.fileList}</span>

                  : "Choose a category to upload a file "}
              </p>
              {/* </div> */}
            </div>
          </div>

          <div className="upload_btn">
            <Button
              type="primary"
              onClick={this.submit}
              className="login-form-button uploadbtn"
              style={{ marginTop: "0" }}
            >
              Upload Document
            </Button>
          </div>
          {/* <p className="nofiletext">
              {" "}
              {this.state.category.length > 0
                ? this.state.fileList.length === 0 ? "No File Choosen" : this.state.fileList.map(x => {
                  return (
                    <p>{x}</p>
                  )
                })
                : "Choose a category to upload a file "}
            </p> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

function mapDispatchToProps(dispatch, state) {
  return {
    actions: bindActionCreators(actioncreators, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppointmentDetails)
);
