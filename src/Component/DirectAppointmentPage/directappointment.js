import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../MyClinicsPage/MyClinicsPage.css";
import "./directappointment.css";
import "../Dashboard/Dashboard.css";
import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  Tabs,
  Row,
  Col,
  Collapse,
  Select,
  message, Popconfirm, Modal,
  Popover
} from "antd";
import { NavLink } from "react-router-dom";
import approveclinics from "../../images/Approve-Clinics.png";
// import enhance from '../../images/enhance.jpg';
import "../Dashboard/Dashboard.css";
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import forward from "../../images/forward.png";
import accept from "../../images/accept.png";
import success from "../../images/success.png";
import mail from "../../images/mail.png";
import phone from "../../images/phone.png";
const { TextArea } = Input;
// const content = (
//   <div className="popuparea">
//     <div className="callingarea">
//       <a href="tel:+6494461709">
//         <img src={phone} /> Call
//       </a>
//     </div>

//     <div className="mailarea">
//       <a href="#">
//         <img src={mail} /> Text
//       </a>
//     </div>
//   </div>
// );
// function call() {
//   message.info("Clicked on Yes.");
// }

const Panel = Collapse.Panel;
function callback(key) {
  ////console.log(key);
}
const Option = Select.Option;
function handleChange(value) {
  ////console.log(`selected ${value}`);
}

function handleBlur() {
  ////console.log("blur");
}

function handleFocus() {
  ////console.log("focus");
}
function onSearch(val) {
  ////console.log("search:", val);
}
class directappointment extends Component {
  constructor() {
    super();
    this.state = {
      city: [],
      showAccordian: {},
      forwardClinicId: "",
      directAppointmentList: [],
      forwardDetails: {},
      visible: false,
      modal2Visible: false,
      confirmedPatient: {},
      disabled: false,
      display: "none",
      showButtons: {},
      showMessage: {},
      doctorEmail: ""
    };
  }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  handleChange = value => {
    ////console.log(value);
    this.setState({ clinics: value });
  };
  handleChangeclinics = x => {
    ////console.log(x);
    this.setState({
      clinics: x
    });
  };
  showAccordian = x => {
    ////console.log(x);

    // Call to get the patient details>>
    let formData = new FormData();

    formData.append("id", x.id);
    // x.id

    for (var pair of formData.entries()) {
      ////console.log(pair[0] + ", " + pair[1]);
    }
    const config = {
      method: "POST",
      body: formData
    };
    fetch(
      process.env.REACT_APP_apiurl +
      "/restapi/Appointments/getappointmentreqbyid/",
      config
    )

      .then(result =>
        //  ////console.log(result))
        result.json()
      )
      .then(result => {
        //console.log(result, "forward details");

        // put result in a state and  map the state to details in accordion>>>

        if (result.success === 1) {

          this.setState(prevState => {
            let showAccordian = { ...prevState.showAccordian }
            showAccordian[x.id] = !prevState.showAccordian[x.id];
            return { showAccordian };
          });

          //make it efficient
          this.setState({ forwardDetails: result.result[0] })
            // , () => { //console.log(result.result[0]) })
          this.setState(prevState => {
            let showButtons = { ...prevState.showButtons }
            showButtons[x.id] = "false"
            return { showButtons };
          })
          // , () => //console.log(this.state.showButtons, ">>>>>>>>>125"))
          // this.setState (prevState => {
          //   let showMessage = {...prevState.showMessage}
          //   showMessage[x.id] = "true";
          //   if(this.state.forwardDetails){
          //   return {showMessage:"Request is Forworded"};
          //   }
          //   // ()=>//console.log(this.state.showMess".........>>>>>>>>");
          //   else{
          //     return {error:"true"}
          //   }
          // },()=>//console.log(this.state.showMessage,".........>>>>>>>>"));
        }

        else {
          message.error("This appointment details could not be fetched please check your connection or contact admin ")
        }
      })
      .catch(err => {
        //console.log(err);
      });

    //<<<<<<<<< Result

  };

  handleChangeforwardClinicId = x => {
    ////console.log(x);

    this.setState({
      forwardClinicId: x
    });
  };

  // directAppointmentList=(x) =>{
  //     ////console.log(x);
  //     this.props.appointmentReqbyId()

  // }

  componentWillReceiveProps(nextProps) {
    if (!Object.is(nextProps.patientReqbyId, this.props.patientReqbyId)) {
      ////console.log("recieved", nextProps.patientReqbyId);
      //Perform some operation
      this.setState({
        directAppointmentList: nextProps.patientReqbyId,
        doctorEmail: nextProps.userdetails.email
      },()=>{
        console.log(this.state.directAppointmentList);
      });
    }
  }
  componentDidMount() {
    // this.props.actions.getphysicianclinic();
    // //console.log(this.props.userdetails)
    this.props.actions.getAllClinicsToChoose();
    this.props.actions.getPatientRequest(this.props.userdetails.id);

  }

  // ConfirmSubmit = (x) => {

  //   if (this.state.directAppointmentList.id && this.state.forwardDetails.length === 1) {

  //   }
  //   else {
  //     //console.log("error is occuring here...........");
  //   }

  // }


  confirm = (x) => {

    this.setState({ confirmedPatient: x })
      // , () => { //console.log(this.state.confirmedPatient) })

    let formData = new FormData();

    formData.append("acceptid", x.id);

    for (var pair of formData.entries()) {
      //console.log(pair[0] + ", " + pair[1]);
    }
    const config = {
      method: "POST",
      body: formData
    };
    fetch(
      process.env.REACT_APP_apiurl +
      "/restapi/Appointments/acceptpatientrequest/",
      config
    )
      .then(result =>
        //  //console.log(result))
        result.json()
      )
      .then(result => {
        console.log(result);
        if (result.success === 1) {
          // Acceptpatient request Api >>>>

          this.setState({
            visible: true,
          });

          this.setState(prevState => {
            let showButtons = { ...prevState.showButtons }

            let showMessage = { ...prevState.showMessage }
            showButtons[x.id] = "false";
            // showMessage[x.id] = "accepted"
            return { showButtons, showMessage };
            
          })
          // , () => //console.log(this.state.showButtons, ">>>>>>>>>125"))
          this.props.actions.getPatientRequest(this.props.userdetails.id);
        } else {
          message.error(
            "Error; please check your connection or contact admin"
          );
        }
      })
      .catch(err => {
        ////console.log(err);
      });



  };
  // onClose =(e)=> {
  //   //console.log(e,"close Forward button.......");
  //   this.setState({
  //     visible: false,
  //   });
  // if (this.state.forwardClinicId.length === 0){
  //  return (modal2Visible=false);
  // }
  // else{
  //   return ("error")
  // }
  // }

  cancel = (e) => {
    //console.log(e);
    message.error("Clicked on No");
  }


  handleOk = e => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    //console.log("12255555555555", e);
    this.setState({
      visible: false,
    });
  };

  forwardDetails = (x) => {
   
    if (this.state.forwardClinicId.length === 0) {
      alert("Please choose a clinic from list first")
    }
    else {

      let formData = new FormData();

      formData.append("forwardid", x.id);
      formData.append("clinicid", this.state.forwardClinicId);
      formData.append("pname", this.state.forwardDetails.name);
      formData.append("mobile", this.state.forwardDetails.contactNo);
      formData.append("category", this.state.forwardDetails.servicespeciality);
      formData.append("drname", this.state.forwardDetails.phyname);
      formData.append("userId", this.props.userdetails.id);

      for (var pair of formData.entries()) {
        //console.log(pair[0] + ", " + pair[1]);
      }
      const config = {
        method: "POST",
        body: formData
      };
      fetch(
        process.env.REACT_APP_apiurl +
        "/restapi/Leads/insertleads/",
        config
      )
        .then(result =>
          //  //console.log(result))
          result.json()
        )
        .then(result => {
          console.log(result);
          if (result.success === 1) {
            // Forward request Api >>>>


            message.success("Success, Patient forwarded!!")

            this.setState({ forwardClinicId: "" })

            this.setState(prevState => {
              let showButtons = { ...prevState.showButtons };
              let showMessage = { ...prevState.showMessage };
              let showAccordian = { ...prevState.showAccordian };
              showButtons[x.id] = "false";
              // showMessage[x.id] = "forwarded"
              showAccordian[x.id] = !prevState.showAccordian[x.id];
              return { showButtons, showMessage, showAccordian };
            }
            // , () => //console.log(this.state.showButtons, ">>>>>>>>>126"))
            )
            this.props.actions.getPatientRequest(this.props.userdetails.id);
          }

          else {
            message.error(
              "Error; please check your connection or contact admin"
            );
          }

        })
        .catch(err => {
          //console.log(err);
        });

    }
  }

  render() {
    return (
      <div className="conferdr">
        <div className="sectionnamePart fordesktopversion">
          <NavLink to="/dashboard">
            <Icon type="left" className="arrow_back hidden-lg" />
            <span className="titlename">Direct Appointments</span>
            <i class="fas fa-ellipsis-h arrow_back ellipsis" />
          </NavLink>
        </div>
        <div className="tabsectionPart">
          <div className="formobileview">
            {
              //  Mobile view Start>>>>>>>>>>
            }
            <div className="cardsection mycliniccard directappointmentcards">
              <div className="tabcards">
                {Array.isArray(this.state.directAppointmentList) &&
                  this.state.directAppointmentList.map(x => {
                    if(x.status !=="Completed"&& x.status !=="Cancelled"){
                    return (
                      
                      <Card
                        bordered={true}
                        className="tabcard"
                        style={{ paddingLeft: "0", width: "322px" }}
                      >
                        <div key={x.id}>
                          <Row gutter={14} className="alignadjust">
                            <Col span={18}>
                              <p className="personnametext hsptlname"> {x.name}</p>
                              <p className="bookdetailstext"> id- {x.appid}</p>
                              <p className="bookdetailstext">Reason- {x.reason}</p>
                              <p className="bookdetailstext">Date- {x.appdate}</p>
                            </Col>
                            <Col span={1} />
                            <Col span={5}>
                              {x.status=== "Requested" ?

                                <div className="appointmentbuttongroup">

                                  <Button
                                    type="primary"
                                    title="Forward"
                                    className="forwardbtn"
                                    // onCancel={this.handleCancel()}
                                    onClick={() => this.showAccordian(x)}
                                  // onClose={this.onClose()}
                                  >
                                    <img
                                      src={forward}
                                      className="forwardicon"
                                      alt="formward"
                                    />
                                  </Button>

                                  <Popconfirm

                                    title={"Are you sure you want to accept? "}
                                    onConfirm={() => this.confirm(x)}
                                    onCancel={() => this.cancel()}
                                    okText="Yes"
                                    cancelText="No"
                                    placement="topRight"
                                  // onClick={() => this.confirm(x)}
                                  >
                                    <Button
                                      type="primary"
                                      title="Accept"
                                      className="acceptbtn"

                                    >
                                      <img src={accept} className="accepticon" />
                                    </Button>

                                  </Popconfirm>


                                </div>
                              :
                              
                                x.status === "Approved" ? <p className="accptndfrwdsms">Request accepted!!</p>
                             :
                            x.status === "Forwarded" && <p className="accptndfrwdsms">Request forwarded!!</p>
                          }
                              
                            </Col>
                          </Row>
                          {this.state.showAccordian[x.id] === true && (

                            <div className="directselectpart">
                              <Row>
                                <Col md={12} xs={14}>
                                  <Select
                                    showSearch
                                    // style={{ width: 200 }}
                                    onSearch={onSearch}
                                    className=""
                                    placeholder="Select a Category"
                                    optionFilterProp="children"
                                    onChange={this.handleChangeforwardClinicId}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    filterOption={(input, option) =>
                                      option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                    {this.props.getAllClinicsName.map(x => {
                                      return (
                                        <Option value={x.clinicid}>{x.name}</Option>
                                      );
                                    })}
                                  </Select>
                                </Col>

                                <Col md={12} xs={10}>

                                  <Button
                                    type="primary"
                                    className="forwardbtn"
                                    // onClick={this.showAccordian.bind(this)}
                                    // onCancel={this.handleCancel}
                                    onClick={() => this.forwardDetails(x)}
                                  >
                                    Forward
                            </Button>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={24} xs={24}>
                                  {/* <Modal
                                      // title="Basic Modal"
                                      visible={this.state.visible}
                                      onOk={this.handleOk}
                                      onCancel={this.handleCancel}> */}
                                  <div className="categorydetls">

                                    <p className="nmelist">{this.state.forwardDetails.name}</p>
                                    <p className="nmelist">Application Id: {this.state.forwardDetails.appid}</p>
                                    <p className="nmelist">Contact No:{this.state.forwardDetails.contactNo}</p>
                                    <p className="nmelist">Contact mail:{this.state.forwardDetails.email}</p>
                                    {/* <p className="nmelist">Contact mail:{this.state.forwardDetails.email}</p> */}
                                    <p className="nmelist">Patient problem:{this.state.forwardDetails.problem}</p>
                                    <p className="nmelist">Date:{this.state.forwardDetails.appdate}</p>

                                  </div>
                                  {/* </Modal> */}
                                </Col>
                              </Row>
                            </div>
                          )}
                          {/* {
                            this.state.showMessage[x.id] === "forwarded" && <p>Request forwarded!!</p>
                          } */}
                        </div>
                      </Card>
                    );
                        }
                  })}
                <Modal
                  // title="Basic Modal"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}>
                  <p className="smsheading"><img src={success} className="successicn" /><sapn>Successfully appointment accepted</sapn></p>
                  {/* <a href={"#:" + this.state.confirmedPatient.patientno}> */}
                  <a href={"tel:" + this.state.confirmedPatient.patientno}><div className="cntnctdtl"> <div className="calndsmsicn"><img src={phone} className="cntcticn" alt="" />{" "} Call</div>
                    <span> {this.state.confirmedPatient.patientno}</span></div></a>
                  {/* <a href={"#:"+this.state.confirmedPatient.patientmail}> */}
                  <a href={`mailto:${this.state.confirmedPatient.patientmail}?subject=Doctor mail from ${this.state.doctorEmail} `}><div className="cntnctdtl"><div className="calndsmsicn"><img src={mail} className="cntcticn" alt="" />{" "} Text</div>
                    <span>{this.state.confirmedPatient.patientmail}</span></div></a>
                  <p>Patient name: {this.state.confirmedPatient.name}</p>
                  <p>Patient problem: {this.state.confirmedPatient.problem}</p>
                  <p>Patient symptom: {this.state.confirmedPatient.symptom}</p>
                  <div className="modalbutn">
                    <Button onClick={this.handleCancel} className="okbtn">Ok</Button>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          {
            //  Mobile view ends<<<<<<<<<<<<<<<<<<
          }
        </div>

        {/* for destop version start */}
        <div className="fordesktop1">
          <div className="cardsection mycliniccard directappointmentcard">
            <Row gutter={16}>
              {Array.isArray(this.state.directAppointmentList) &&
                this.state.directAppointmentList.map(x => {
                  if(x.status !=="Completed"&& x.status !=="Cancelled"){
                  return (
                    <Col md={8}>
                      <Card
                        bordered={true}
                        className="tabcard"
                        style={{ paddingLeft: "0", width: "322px" }}
                      >
                        <Row gutter={14} className="alignadjust">
                          <Col span={18}>

                            <p className="personnametext hsptlname"> {x.name}</p>
                            <p className="bookdetailstext"> id- {x.appid}</p>
                            <p className="bookdetailstext">Reason- {x.reason}</p>
                            <p className="bookdetailstext">Date- {x.appdate}</p>
                          </Col>
                          
                          <Col span={6}>
                            {/* {this.state.showButtons[x.id] !== "false" && */}
                              {x.status ==="Requested"?
                              <div className="appointmentbuttongroup">
                                <Button
                                  type="primary"
                                  title="Forward"
                                  className="forwardbtn"
                                  onClick={() => this.showAccordian(x)}

                                // onCancel={this.handleCancel}
                                >
                                  <img src={forward} className="forwardicon" />
                                </Button>

                                {/* <NavLink to="/dashboard/appointmentdetails"> */}
                                <Popconfirm
                                  title={"Are you sure you want to accept? "}
                                  onConfirm={() => this.confirm(x)}
                                  onCancel={() => this.cancel()}
                                  okText="Yes"
                                  cancelText="No"
                                  placement="topRight"
                                // onClick={() => this.confirm(x)}
                                >
                                  <Button
                                    type="primary"
                                    title="Accept"
                                    className="acceptbtn"
                                  // onClick={() => this.confirm(x)}
                                  // onClick={() => this.acceptPatientRequest(x)}
                                  >
                                    <img src={accept} className="accepticon" />
                                  </Button>
                                </Popconfirm>
                                {/* </NavLink> */}
                              </div>
                            :
                            
                              x.status === "Approved" ? <p className="accptndfrwdsms">Request accepted!!</p>
                            
                            :
                              x.status === "Forwarded" && <p className="accptndfrwdsms">Request forwarded!!</p>
                            }
                          </Col>
                        </Row>
                        {this.state.showAccordian[x.id] === true && (

                          <div className="directselectpart">
                            <Row>
                              <Col md={18} xs={24}>
                                <Select
                                  showSearch
                                  style={{ width: 230 }}
                                  className=""
                                  onSearch={onSearch}
                                  placeholder="Select Clinic"
                                  optionFilterProp="children"
                                  onChange={this.handleChangeforwardClinicId}
                                  onFocus={handleFocus}
                                  onBlur={handleBlur}
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >


                                  {this.props.getAllClinicsName.map(x => {
                                    return <Option value={x.clinicid}>{x.clinic}</Option>;
                                  })}
                                </Select>
                              </Col>
                              <Col md={6} xs={24}>
                                {/* {this.state.showButtons[x.id] !== "false" && */}
                                <Button
                                  type="primary"
                                  className="forwardbtn"
                                  onClick={() => this.forwardDetails(x)}
                                // onCancel={this.state.handleCancel}
                                >
                                  Forward
                            </Button>
                              </Col>
                              <Col md={24} xs={24}>
                                {/* <Modal
                                    // title="Basic Modal"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}> */}
                                <div>

                                  <p className="nmelist">{this.state.forwardDetails.name}</p>
                                  <p className="nmelist">Application Id: {this.state.forwardDetails.appid}</p>
                                  <p className="nmelist">Contact No:{this.state.forwardDetails.contactNo}</p>
                                  <p className="nmelist">Contact mail:{this.state.forwardDetails.email}</p>
                                  {/* <p className="nmelist">Contact mail:{this.state.forwardDetails.email}</p> */}
                                  <p className="nmelist">Patient problem:{this.state.forwardDetails.problem}</p>
                                  <p className="nmelist">Date:{this.state.forwardDetails.appdate}</p>

                                </div>
                                {/* </Modal> */}

                              </Col>
                            </Row>
                          </div>
                        )}

                        {/* {
                              this.state.showMessage[x.id] === "abc" && <span>Request forwarded!!</span>
                            }     */}
                      </Card>
                    </Col>
                  );
                          }
                })}
              <Modal
                // title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <p className="smsheading"><img src={success} className="successicn" /><sapn> Appointment accepted successfully.Please contact the patient.</sapn></p>
                <a href={"tel:" + this.state.confirmedPatient.patientno}><div className="cntnctdtl"> <div className="calndsmsicn"><img src={phone} className="cntcticn" alt="" />{" "} Call {" "}</div>
                    <span> {this.state.confirmedPatient.patientno}</span></div></a>
                  {/* <a href={"#:"+this.state.confirmedPatient.patientmail}> */}
                  <a href={`mailto:${this.state.confirmedPatient.patientmail}?subject=Doctor mail from ${this.state.doctorEmail} `}><div className="cntnctdtl"><div className="calndsmsicn"><img src={mail} className="cntcticn" alt="" />{" "} Text {" "}</div>
                    <span>{this.state.confirmedPatient.patientmail}</span></div></a>
                <p>Patient name: {this.state.confirmedPatient.name}</p>
                <p>Patient problem: {this.state.confirmedPatient.problem}</p>
                <p>Patient symptom: {this.state.confirmedPatient.symptom}</p>
                <div className="modalbutn">
                  <Button onClick={this.handleCancel} className="okbtn">Ok</Button>
                </div>
              </Modal>

            </Row>
          </div>
        </div>
        {/* for desktop version end */}
      </div>
    );
  }
}
// export default MyClinicsPage;

const mapStateToProps = state => {
  return state;
};

function mapDispatchToProps(dispatch, state) {
  return {
    actions: bindActionCreators(actioncreators, dispatch)
  };
}

const Wrappeddirectappointment = Form.create({ name: "horizontal_login" })(
  directappointment
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrappeddirectappointment)
);
