import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./ConsultationPage.css";
import { Button, Card, Form, Icon, Input, Popconfirm, Tabs, Row, Col, message } from "antd";

import { NavLink } from "react-router-dom";
// import { NavLink } from 'react-router-dom';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import deletebtn from "../../images/delete.png";

const TabPane = Tabs.TabPane;
const Option = Col.Option;

function handleChange(value) {
  //console.log(`selected ${value}`);
}

class ConsultationPage extends Component {

  constructor() {
    super();
    this.state = {
      status: "past",
      visible: false,
      showButtons: false

    };
  }

  callback = key => {
    // this.setState({selectedkey:key})
    //console.log(key);

    switch (key) {
      case "1":
        this.props.actions.getPastAppointments();
        this.setState({ status: "past" })

        break;
      case "2":
        // todayscallback
        this.props.actions.getTodaysAppointments();
        this.setState({ status: "today" })
        break;
      case "3":
        //upcoming
        this.props.actions.getfutureappointments();
        this.setState({ status: "future" })
        break;

      default:
        //console.log("To be selected");
    }
  };
  handleChangepastappointments = x => {
    //console.log(x);
    this.setState({
      pastappointments: x
    });
  };
  handleChangetodaysappointments = y => {
    //console.log(y);
    this.setState({
      todaysappointments: y
    });
  };
  handleChangeupcommig = z => {
    //console.log(z);
    this.setState({
      upcomming: z,
    });
  };

  componentWillReceiveProps = (newProps) => {
    // console.log(newProps.pastappointments);
    //console.log(newProps.todaysappointments);
    //console.log(newProps.upcomming);
   
  };
  componentDidMount(){
    console.log(this.props.location.state);
    
  }

 
  //////// Adding Praqtibha //////////////////////////

  // cancel = (e) => {
  //   //console.log(e);
  //   message.error("Clicked on No");
  // }


  handleOk = z => {
    //console.log(z);
    this.setState({
      visible: false,
    });
    //console.log(z.id, "in cancel apptmnt");
    this.props.actions.cancelFutureAppointment(z.appid);
  }

  handleCancel = e => {
    //console.log(">>>>>>>>>>>>>>>>", e);
    this.setState({
      visible: false,

    });
  };


  redirect = data => {
    //console.log(data);

    let formData = new FormData();

    formData.append("appid", data.appid);

    for (var pair of formData.entries()) {
      //console.log(pair[0] + ", " + pair[1]);
    }
    const config = {
      method: "POST",
      body: formData
    };
    fetch(
      process.env.REACT_APP_apiurl +
      "/restapi/Appointments/getappointmentdetails/",
      config
    )
      .then(result =>
        //  //console.log(result))
        result.json()
      )
      .then(result => {
        //console.log(result);
        if (result.success === 1) {
          this.props.history.push({
            pathname: "/dashboard/appointmentdetails",
            from: "consultation",
            data: result.result[0],
            status: this.state.status
          });
        } else {
          message.error(
            "Details of appointment could not be fetched; please check your connection or contact admin"
          );
        }
      })
      .catch(err => {
        //console.log(err);
      });
  };
  onclickedCancel = () => {
    //console.log("no button is clicked>>>>>>>>>>>>>>")
  }
  // cancelFutureAppointment = z => {
  //   //console.log(z);
  //   //console.log("yes button clicked>>>>>>>>>>>>>>>>")
  //   this.props.actions.cancelFutureAppointment(z);
  //   //console.log(id, "in cancel apptmnt");
  //   return (dispatch, getState )=> {
  //     let formData = new FormData();

  //     formData.append("cancelid", id);
  //     for (var pair of formData.entries()) {
  //       //console.log(pair[0] + ', ' + pair[1]);
  //     }
  //     const config = {
  //       method: 'POST',
  //       body: formData,
  //       header: [{
  //         "Content-Type": "application/json",
  //       }]
  //     }
  //     fetch(process.env.REACT_APP_apiurl + "/restapi/Appointments/cancelappointmentbydr/", config)
  //       .then(result =>
  //         //  //console.log(result))
  //         result.json())
  //       .then(result => {
  //         //console.log(result);
  //         //console.log(getState())
  //         if(result.success===1)
  //         {

  //         let futureApptList=[...getState().upcomming]
  //         //console.log(futureApptList);

  //         let index= futureApptList.findIndex(x=>{
  //           return x.appid=== id
  //         });
  //           this.props.actions.cancelFutureAppointment(id);
  //           this.setState(prevState => {
  //             let showButtons = { ...prevState.showButtons };
  //             showButtons[id] = "false";
  //             return { showButtons};
  //           }, () => //console.log(this.state.showButtons, ">>>>>>>>>115"))



  //         // })

  //         futureApptList[index].status="Cancelled"

  //         // dispatch(upcomming(futureApptList))
  //       }
  //       })
  //       .catch(err => {
  //         //console.log(err);
  //       });

  //   }
  // }



  render() {
    return (
      <div className="conferdr">
        <div className="sectionnamePart fordesktopversion">
          <NavLink to="/dashboard">
            <Icon type="left" className="arrow_back hidden-lg" />
            <span className="titlename">Consultations</span>
          </NavLink>
        </div>
        <div className="tabsectionPart consultations-area">
          <Tabs defaultActiveKey="2" type="card" onChange={this.callback}>
            {this.props.location && this.props.location.state && this.props.location.state.flag == false  &&
            
            <TabPane tab="Past" key="1">
              <div className="cardsection">
                <Row gutter={16}>
                {this.props.pastappointments.length === 0 ? (
                    <p className="nobooking">No appointments</p>
                  ) : (
                  this.props.pastappointments.map(x => {
                    return (
                      <Col lg={8}>
                        <Card
                          bordered={true}
                          style={{ width: 322 }}
                          className="tabcard"
                          onClick={() => {
                            this.redirect(x);
                          }}
                        >
                          <Row gutter={16}>
                            <Col span={13}>
                              <div>
                                <p className="personnametext"> {x.patientname}</p>
                                {/* Jyotishman Sahu */}
                                <p className="bookdetailstext">
                                  Appt Id:{x.appid}
                                </p>
                                {/* Appt Id : A20192624 */}
                                <p className="bookdetailstext">
                                  {x.updatedDt + x.updatedby}
                                </p>
                                {/* updatedDt+updatedby{ "20-01-2019"  + "DemoClinic"} */}
                              </div>
                              {/* {this.props.pastappointments.map(x => {
                                                    return <p value={x.name}>{x.name}</p>;
                                                })} */}
                            </Col>
                            <Col span={6} />
                            <Col span={4}>
                            {/* {this.props.preData && this.props.preData === x.appid? 
                           
                                <p className="bookedtext">Completed</p>
                              */}
                              <p className="bookedtext">{x.status}</p>
                              {/* <span><Button className="deletebtn"><img src={deletebtn}/></Button></span> */}
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    );
                  })
                  )}
                 
                </Row>
              </div>
            </TabPane>
            }
            
            <TabPane tab="Today" key="2">
              <div className="cardsection todaycards">
                <Row gutter={16} className="tabcards">
                  {this.props.todaysappointments.length === 0 ? (
                    <p className="nobooking">No appointments booked today</p>
                  ) : (
                      this.props.todaysappointments.map(y => {
                        return (
                          <Col lg={8}>
                            <Card
                              bordered={true}
                              style={{ width: 322 }}
                              className="tabcard nobookingcard"
                              onClick={() => {
                                this.redirect(y);
                              }}
                            >
                              <Row gutter={16}>
                                <Col span={13}>
                                  <div>
                                    <p className="personnametext">{y.patientname}</p>
                                    {/* Jyotishman Sahu */}
                                    <p className="bookdetailstext">
                                      Appt Id :{y.appid}
                                    </p>
                                    <p className="bookdetailstext">
                                      {y.updatedDt + y.updatedby}
                                    </p>
                                    {/* updatedDt+updatedby{"20-01-2019" + "DemoClinic"} */}
                                  </div>
                                </Col>
                                <Col span={7} />
                                <Col span={4}>
                                  <p className="bookedtext">{y.status}</p>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        );
                      })
                    )}
                </Row>
              </div>
            </TabPane>
            {this.props.location && this.props.location.state && this.props.location.state.flag ==false &&
            
            <TabPane tab="Upcoming" key="3">
              <div className="cardsection todaycards">
                <Row gutter={16} className="tabcards">

                  {this.props.upcomming.length === 0 ? (
                    <p className="nobooking">No appointments booked yet</p>
                  ) : (
                      this.props.upcomming.map(z => {
                        return (
                          <Col lg={8}>
                            <Card
                              bordered={true}
                              style={{ width: 322 }}
                              className="tabcard nobookingcard"
                            >
                              <Row gutter={16}>
                                <Col span={13}>
                                  <p className="personnametext" onClick={() => { this.redirect(z) }}>{z.name}</p>
                                  {/* Jyotishman Sahu */}
                                  <p className="bookdetailstext" onClick={() => { this.redirect(z) }}>
                                    Appt Id :{z.appid}
                                  </p>
                                  <p className="bookdetailstext" onClick={() => { this.redirect(z) }}>
                                    {z.updatedDt + z.updatedby}
                                  </p>
                                  {/* updatedDt+updatedby {"20-01-2019" + "DemoClinic"} */}
                                </Col>
                                <Col span={7} />
                                <Col span={4}>
                                  <p className="bookedtext">{z.status}</p>
                                  {/* <div> */}
                                  {/* {this.state.showButtons[id] !== "false" && */}
                                  <span>

                                    <Popconfirm className="consultationpopup"
                                      title={"Are you sure you want to Cancel? "}

                                      onConfirm={() =>
                                        this.handleOk(z)
                                      }

                                      onCancel={() => this.onclickedCancel()}
                                      okText="Yes"
                                      cancelText="No"
                                      placement="topRight">
                                      {z.status !== "Cancelled" &&
                                        <Button
                                          // onClick={() =>
                                          //   this.cancelFutureAppointment(z)
                                          // }

                                          title="Cancel"
                                          className="deletebtn"
                                        >
                                          <img src={deletebtn} alt={"delete"} />
                                        </Button>
                                      }
                                    </Popconfirm>

                                  </span>
                                  {/* }   */}
                                </Col>
                              </Row>

                            </Card>
                          </Col>
                        );
                      })
                    )}
                </Row>
              </div>
            </TabPane>
            }
          </Tabs>
        </div>
      </div>
    );
  }
}
// export default ConsultationPage;
const mapStateToProps = state => {
  return state;
};

function mapDispatchToProps(dispatch, state) {
  return {
    actions: bindActionCreators(actioncreators, dispatch)
  };
}

const WrappedConsultation = Form.create({ name: "horizontal_login" })(
  ConsultationPage
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedConsultation)
);
