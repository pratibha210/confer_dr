import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./FormFill.css";
import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  Tabs,
  Row,
  Col,
  Select,
  Radio,
  Badge,
  Avatar,
  Modal,
  Popover,
  message,
  Popconfirm,
  DatePicker
} from "antd";
import { NavLink } from "react-router-dom";
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moreicn from "../../images/moreicn.png";
import arrow from "../../images/arrow.png"

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
var moment = require('moment');

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  //console.log(date, dateString);
}

// const content = (
//   <div className="popovercontent">
//     <p className="editmnu"><Button onClick={() => this.setModal2Visible(true)}><Icon type="edit" /> <span>Edit</span></Button></p>
//     <p className="deletmnu"><Icon type="delete" /> <span>Delete</span></p>
//   </div>
// );

function handleChange(value) {
  //console.log(`selected ${value}`);
}
function handleBlur() {
  //console.log("blur");
}

function handleFocus() {
  //console.log("focus");
}

class FormFill extends Component {
  constructor() {
    super();
    this.state = {
      doses: "",
      medicines: "",
      length: "",
      modal2Visible: false,
      medicineList: [],
      edit: false,
      submitform: "",
      size: "default",
      servicesList: [],
      chosenServices: [],
      diagnosis: '',
      symptoms: ''

      // showmedicine:[],
    };
    // handleSizeChange = e => {
    //     this.setState({ size: e.target.value });
    // };
  }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
    this.props.form.resetFields([
      "mname",
      "doses",
      "duration_dmy",
      "timing",
      "n_days",
      ///adding Pratibha//////
      // "diagnosis",
      // "symptoms"
    ]);
    this.setState({ edit: false });
  }
  // handleChangeduration_dmy = value => {
  //     //console.log(value);

  // let chosendays = this.state.days_month.filter(x => {
  //     return x.days_month === e;
  // })
  // //console.log(chosendays, "Check -- this!!!!!!!!")
  // this.setState({
  //     days_month: chosendays[0]
  // });

  // };

  handleChangedoses = y => {
    //console.log(y);
    this.setState({
      doses: y
    });
  };
  handleChangemname = e => {
    //console.log(e);
    //   \\ //console.log(e.target.name)

    let chosenMed = this.props.medicines.filter(x => {
      return x.brand_name === e;
    });

    //console.log(chosenMed, "Check -- this!!!!!!!!");
    this.setState({
      chosenMedicine: chosenMed[0]
    });
    // id matches so generic names should not match-- be requirement
  };
  componentDidMount() {
    //console.log(this.props.location.data);
    if (!this.props.location.data) {
      this.props.history.push("/dashboard");
    } else {
      //console.log(this.props.location.data);

      let formData = new FormData();

      formData.append("clinicid", this.props.location.data.clinic);


      for (var pair of formData.entries()) {
        //console.log(pair[0] + ', ' + pair[1]);
      }
      const config = {
        method: 'POST',
        body: formData,
      }
      fetch(process.env.REACT_APP_apiurl + "/restapi/Services/gettotalservicedetailsbyclinicid/", config)
        .then(result =>
          //  //console.log(result))
          result.json())
        .then(result => {
          //console.log(result);
          if (result.success === 1) {
            this.setState({
              servicesList: result.result
            })

            let data = new FormData();

            data.append("appid", this.props.location.data.appid);

            for (var pair of data.entries()) {
              //console.log(pair[0] + ", " + pair[1]);
            }
            const config = {
              method: "POST",
              body: data
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
                //console.log(result);
                if (result.success === 1) {
                  // this.setFieldsValue({

                  // });
                  let data = result.result;
                  //console.log(data);
                  this.setState({ diagnosis: data[0].diagnosis, symptoms: data[0].symptoms })
                  this.props.form.setFieldsValue({
                    // prescriptionDetails:result.result,
                    diagnosis: this.state.diagnosis,
                    symptoms: this.state.symptoms
                  }, () => {
                    //console.log(result.result, this.state.diagnosis, this.state.symptoms);
                  })


                }
              })
          }
          else {
            message.error('Clinic services list could not be fetched please check your connection.');
          }

        })
        .catch(err => {
          //console.log(err);
        });
      // }

      this.props.actions.getdosesList();
      this.props.actions.getmedicinelist();
      this.props.actions.showMedication(this.props.location.data.appid);
      this.props.form.setFieldsValue({
        "ageGender":
          this.props.location.data.patientage +
          "/" +
          this.props.location.data.patientgender,
        "diagnosis": this.state.diagnosis,
        "symptoms": this.state.symptoms
      });
      //console.log(this.props.location.data, "data");
    }

  }

  componentWillReceiveProps(nextProps) {
    if (!Object.is(nextProps.showMedicine, this.props.showMedicine)) {
      //console.log("recieved", nextProps.showMedicine);
      //Perform some operation
      this.setState({ medicineList: nextProps.showMedicine }, () => {
        //console.log(this.state.medicineList, "<<<<<<<<<<<<This>>>>>>>>>>>");
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    //console.log(e);
    //console.log(this.props.form);

    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log("Received values of form: ", values);
        this.props.actions.getmedication();
      }
    });
  };

  oncancel = e => {
    //console.log(e);
    this.setState({
      modal2Visible: false,
      edit: false
    });
  };


  addMedicine = e => {
    //console.log(e);
    this.props.form.validateFields(
      ["mname", "doses", "duration_dmy", "timing", "n_days"],
      (err, values) => {
        if (!err) {
          //console.log(this.state.edit);
          if (this.state.edit === false) {
            // this.setState({ edit: false })
            //console.log("Received values of form: ", values);
            this.setState({ edit: false });
            this.props.actions.saveMedication(
              values,
              this.state.chosenMedicine,
              this.props.location.data.appid
            );
            // this.setState({ edit: false })

            this.setState({ modal2Visible: false });
            this.props.form.resetFields([
              "mname",
              "doses",
              "duration_dmy",
              "timing",
              "n_days",
              // //// adding Pratibha //////////////////
              // "diagnosis",
              // "symptoms"
            ]);
          } else {
            this.setState({ modal2Visible: false });
            // //console.log(
            //   this.state.chosenMedicine,
            //   values,
            //   this.state.editId,
            //   this.state.appId
            // );
            this.props.actions.editMedication(
              values,
              this.state.chosenMedicine,
              this.state.editId,
              this.state.appId
            );

            this.props.form.resetFields([
              "mname",
              "doses",
              "duration_dmy",
              "timing",
              "n_days",
              //// adding Pratibha ////////////////////
              // "diagnosis",
              // "symptoms"
            ]);
            this.setState({ edit: false });
          }
        }
      }
    );
  };

  // review = () => {
  //    this.setState({
  //   modal2Visible: true,
  //   diagnosis: this.props.location.data.diagnosis,
  //   symptoms: this.props.location.data.symptoms
  //   })
  // }


  editMed = x => {
    //console.log(x);
    this.setState({
      modal2Visible: true,
      edit: true,
      editId: x.id,
      appId: x.appid

    });

    let chosenMed = this.props.medicines.filter(med => {
      return med.brand_name === x.commercialname;
    });


    //console.log(chosenMed, "Check -- this!!!!!!!!");
    this.setState({
      chosenMedicine: chosenMed[0]

    });

    this.props.form.setFieldsValue({
      mname: x.commercialname,
      doses: x.dosage,
      duration_dmy: x.duration_dmy,
      n_days: x.duration_number,
      timing: x.timing,

      // diagnosis,
      // symptoms
    });
  };
  goBack = () => {
    this.props.history.push({
      pathname: "/dashboard/appointmentdetails",
      data: this.props.location.data,
      status: "past/present",
      from: "formfill"
    });
  };

  chooseServices = (e) => {
    // chosenServices
    //console.log(e)
    this.setState({ chosenServices: e })
  }

  submit = e => {
    e.preventDefault();
    //console.log(this.props.location.data.appid)
    this.props.form.validateFields(["ageGender", "symptoms", "diagnosis", "nextdate", "other_services"], (err, values) => {
      if (!err) {
        //console.log("Received values of form: ", values);
        // this.setState({submitform: this.addMedicine})
        //console.log(moment(values.nextdate).format("DD-MM-YYYY"))

        let formData = new FormData();
        /////////
        formData.append("patientage", values.ageGender);
        formData.append("patientgender", values.ageGender);
        /////////
        formData.append("appid", this.props.location.data.appid);
        formData.append("symptoms", values.symptoms);
        formData.append("diagnosis", values.diagnosis);
        formData.append("service_string", this.state.chosenServices.join(","));
        formData.append("other_services", values.other_services);
        formData.append("nextdate", moment(values.nextdate).format("DD-MM-YYYY"));
        //  formData.append("userid", x.id);

        for (var pair of formData.entries()) {
          //console.log(pair[0] + ", " + pair[1]);
        }
        const config = {
          method: "POST",
          body: formData
        };
        fetch(
          process.env.REACT_APP_apiurl +
          "/restapi/Eprescription/addprescription/",
          config
        )
          .then(result =>
            //  //console.log(result))
            result.json()
          )
          .then(result => {
            //console.log(result);
            if (result.success === 1) {
              // Forward request Api >>>>

              // this.setState({
              //   visible: true,
              // });
              // message.success(
              //   "Success, prescription submitted"
              // );
              // this.props.actions.priscriptiondata(this.props.location.data.appid);
              this.goBack()

            } else {
              message.error(
                "Error; please check your connection or contact admin"
              );
            }
          })
          .catch(err => {
            //console.log(err);
          });


      }
    });
  };


  render() {
    const { size } = this.state;
    const { getFieldDecorator } = this.props.form;
    const content = row => {
      return (
        <div className="popovercontent">
          <p>
            <Button onClick={() => this.editMed(row)} className="editmnu">
              <Icon type="edit" /> <span>Edit</span>
            </Button>
          </p>

          <p>
            <Button
              onClick={() =>
                this.props.actions.deleteMedication(
                  row.id,
                  this.props.location.data.appid
                )
              }
              className="deletmnu"
            >
              <Icon type="delete" /> <span>Delete</span>
            </Button>
          </p>
        </div>
      );
      // }
    };

    return (
      <div className="conferdr">
        <div
          className="sectionnamePart formfill fordesktopversion"
          onClick={this.goBack}
        >
          <NavLink to="/dashboard/appointmentdetails" className="patentdetlhedng">
            {/* <Icon type="left" className="arrow_back" /> */}
            <Icon type="left" className="arrowbutn" />

            <span className="titlename">Please Fill Out</span>
          </NavLink>
        </div>
        <div className="tabsectionPart formtab">
          {/* <Tabs type="card">
                        <TabPane tab="Add" key="1"> */}
          <div className="form_section Patientdetail">
            <p className="formheader">Patient Details</p>
            <div className="navbartoppart formtoppart">
              <span>
                <Badge count={<Icon type="plus" className="formaddsign" />}>
                  <Avatar shape="circle" icon="user" />
                </Badge>
              </span>
              <p className="profiletext">
                {this.props.location.data &&
                  this.props.location.data.patientname}
              </p>
              {/* {this.props.location.data.patientname} */}
              {/* <Icon type="edit" className="editicon" /> */}
            </div>
            <div className="forminputfields">
              <Form
                onSubmit={this.handleSubmit}
                className="login-form loginFormNew"
              >
                <Form.Item className="marginbt">
                  {getFieldDecorator("ageGender", {
                    rules: [
                      {
                        /*required: true,*/
                        /* message: 'Please input your username!'*/
                      }
                    ]
                  })(
                    <Input
                      placeholder="patientage/patientgender"
                      autocomplete="off"
                    />
                  )}
                </Form.Item>
                <Form.Item className="marginbt">
                  {getFieldDecorator("symptoms", {
                    rules: [
                      {
                        /* required: true,*/
                        /* message: 'Please input your username!'*/
                      }
                    ]
                  })(
                    <Input placeholder="History/Symptoms" autocomplete="off" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("diagnosis", {
                    rules: [
                      {
                        /* required: true,*/
                        /* message: 'Please input your username!'*/
                      }
                    ]
                  })(<Input placeholder="Diagnosis" autocomplete="off" />)}
                </Form.Item>

                <Row gutter={16}>
                  <Col md={20} xs={16}>
                    <p className="formheader secondheadline">Medication</p>
                  </Col>
                  <Col md={4} xs={8}>
                    <div className="medicationaddbutn">
                      <Button
                        icon="plus"
                        onClick={() => this.setModal2Visible(true)}
                      >
                        Add
                  </Button>
                      {/* <Button icon="plus" onClick={this.redirect}>Add</Button> */}
                    </div>
                    <Modal
                      title="Add Medicine"
                      centered
                      visible={this.state.modal2Visible}
                      // onOk={() => this.setModal2Visible(false)}
                      onCancel={() => this.setModal2Visible(false)}
                    >
                      <div className="medicationcard">
                        <div className="forminputfields cardfield">
                          <Form
                            onSubmit={this.handleSubmit}
                            className="login-form loginFormNew"
                          >
                            <Row gutter={16}>
                              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Form.Item className="marginbt">
                                  {getFieldDecorator("mname", {
                                    rules: [
                                      {
                                        required: true,
                                        message:
                                          "Please select correct medicine name!"
                                      }
                                    ]
                                  })(
                                    //  <Input placeholder="Name" autocomplete="off" />
                                    <Select
                                      optionFilterProp="children"
                                      onChange={this.handleChangemname}
                                      onFocus={handleFocus}
                                      onBlur={handleBlur}
                                      placeholder="Medicine Name"
                                      filterOption={(input, option) =>
                                        option.props.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                    >
                                      {this.props.medicines.map(x => {
                                        return (
                                          <Option value={x.brand_name}>
                                            {x.brand_name}
                                          </Option>
                                        );
                                      })}

                                      {/* <Option value="name">name</Option> */}
                                    </Select>
                                  )}
                                </Form.Item>
                              </Col>
                              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Form.Item>
                                  {getFieldDecorator("doses", {
                                    rules: [
                                      {
                                        required: true,
                                        message: "Please select the dosages!"
                                      }
                                    ]
                                  })(
                                    // <Input placeholder="Doses" autocomplete="off" />
                                    <Select
                                      optionFilterProp="children"
                                      onChange={this.handleChangedoses}
                                      onFocus={handleFocus}
                                      onBlur={handleBlur}
                                      placeholder="Doses"
                                      filterOption={(input, option) =>
                                        option.props.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                    >
                                      {this.props.doseslist.map(y => {
                                        return (
                                          <Option value={y.name}>{y.name}</Option>
                                        );
                                      })}

                                      {/* <Option value="doses">doses</Option> */}
                                    </Select>
                                  )}
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Row gutter={16}>
                                  <Col xl={16} lg={16} md={16} sm={16} xs={12}>
                                    <div className="nofield">
                                      <Form.Item>
                                        {getFieldDecorator("n_days", {
                                          rules: [
                                            {
                                              required: true,
                                              message:
                                                "Please input number of days or months!"
                                            }
                                          ]
                                        })(
                                          <Input
                                            placeholder="Number of days or months"
                                            autocomplete="off"
                                            type="number"
                                          />
                                        )}
                                      </Form.Item>
                                    </div>
                                  </Col>
                                  <Col xl={8} lg={8} md={8} sm={8} xs={12}>
                                    <Form.Item>
                                      {getFieldDecorator("duration_dmy", {
                                        // rules: [{ required: true,/* message: 'Please input your username!'*/ }],
                                      })(
                                        // <Input placeholder='duration_dmy' autocomplete="off" />
                                        <Select
                                          placeholder="duration_dmy"
                                        // onChange={this.handleChangeduration_dmy}
                                        // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                          <Option value="days">days</Option>
                                          <Option value="months">months</Option>
                                        </Select>
                                      )}
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Col>
                              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Form.Item className="timeinput">
                                  {getFieldDecorator("timing", {
                                    rules: [
                                      {
                                        required: true,
                                        message: "Please input timing for medicine!"
                                      }
                                    ]
                                  })(
                                    <Input placeholder="Time" autocomplete="off" />
                                  )}
                                </Form.Item>
                              </Col>
                            </Row>

                            <div className="addmedicinebutn">
                              {/* <NavLink to="/FormFill"> */}
                              {/* <Popconfirm
                                onCancel={() => this.cancel()}
                                okText="Yes"
                                cancelText="No"> */}
                              <Button onClick={this.oncancel} className="cnclbtn">
                                Cancel
                          </Button>
                              {/* </Popconfirm> */}
                              <Button onClick={this.addMedicine} className="svebtn">
                                Save
                          </Button>

                              {/* </NavLink>    */}
                            </div>
                          </Form>
                        </div>
                      </div>
                    </Modal>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <div className="medicinelisting">
                    <Card
                      className="medicinecard "

                    //  onClick={this.props.showMedicine}
                    >
                      {Array.isArray(this.state.medicineList) &&
                        this.state.medicineList.map(x => {
                          return (
                            <div className="medicindetail">
                              <p className="medicinnme"> {x.commercialname}</p>
                              <p className="doses">
                                {x.duration_number} {"  "}
                                {x.duration_dmy}
                              </p>
                              <Popover
                                placement="left"
                                content={content(x)}
                                trigger="click"
                              >
                                <Button className="menubarpopover">
                                  <img src={moreicn} />
                                </Button>

                                {/* onClick={this.setState({chosenMed:x},()=>{//console.log(this.state.chosenMed)})}  */}
                              </Popover>
                            </div>
                          );
                        })}
                    </Card>
                    <div className="dradvice">
                      <p className="formheader recommendationheder">
                        Doctor Recommendations
                  </p>
                      <Row gutter={16}>
                        <Col md={12} xs={24}>
                          <Form.Item><div>
                            <Select
                              showSearch
                              mode="multiple"
                              size={size}
                              placeholder="Select test"
                              //   defaultValue={["a10", "c12"]}
                              onChange={this.chooseServices}
                              style={{ width: "100%" }}
                            >
                              {/* {children} */}
                              {
                                this.state.servicesList.map(y => {
                                  return <Option value={y.profile_name}>{y.profile_name}</Option>;
                                })}
                            </Select>
                          </div></Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                          <Form.Item><div className="flowupdate">
                            {getFieldDecorator("nextdate", {
                              rules: [
                                {
                                  required: false,
                                  message:
                                    "Please choose a follow up date!"
                                }
                              ]
                            })(
                              <DatePicker format={"DD-MM-YYYY"} />
                            )}

                          </div></Form.Item>
                        </Col>
                        <Col md={24} xs={24}>
                          <Form.Item><div className="prescriptiontxtarea">
                            {/* <TextArea placeholder="Text here" autosize /> */}
                            {getFieldDecorator("other_services", {
                              rules: [
                                {
                                  required: false,
                                  message:
                                    "Please enter advice!"
                                }
                              ]
                            })(
                              <TextArea placeholder="Other service/advice" autosize />
                            )}
                            <div style={{ margin: "24px 0" }} />
                          </div></Form.Item>
                        </Col>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                          <Form.Item>
                            <div className="frmbutn">
                              <Button onClick={this.submit}>Submit</Button>
                            </div>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Row>
              </Form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
// const WrappedFormFill = Form.create({ name: 'horizontal_login' })(FormFill);
// export default WrappedFormFill;

const mapStateToProps = state => {
  return state;
};

function mapDispatchToProps(dispatch, state) {
  return {
    actions: bindActionCreators(actioncreators, dispatch)
  };
}

const WrappedFormFill = Form.create({ name: "horizontal_login" })(FormFill);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedFormFill)
);
