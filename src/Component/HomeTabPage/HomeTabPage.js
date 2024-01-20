import React, { Component } from 'react';
import '../Dashboard/Dashboard.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Tabs, Drawer, Button, Menu, Icon, Badge, Avatar, Card, Col, Row } from 'antd';
import myclinic from '../../images/My-Clinics.png';
import myclinic_coloured from '../../images/My_Clinics_png.png';
import consultations from '../../images/Consultations.png';
import associateclinics from '../../images/Associate-Clinics.png';
import approveclinics from '../../images/Approve-Clinics.png';
import bell from '../../images/notification.png';
import mail from '../../images/Massage.png';
import { NavLink } from 'react-router-dom';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class HomeTabPage extends Component {
    constructor() {
        super();
        this.state = {
            clickToHide: true,
            autoHide: false,
            autoHideDelay: null,
            flag: true

            
        }
    }
    componentDidMount() {

        sessionStorage.setItem("component", "parent");
        ////console.log(sessionStorage.getItem('token'))
        if (sessionStorage.getItem('token')) {

            this.props.actions.resumesession(this.props.history, sessionStorage.getItem('token'))
            // this.props.history.push("/dashboard")

            // if(Object.keys(this.props.userdetails)>0){

            // }
            ////console.log(this.props.upcomming);
            ////console.log(this.props.userdetails)
            ////console.log(this.props.todaysappointments);
            ////console.log(this.props.clearNotification, "L29>>>hometabpage")
            ////console.log(this.props.todaysappointments.length + this.props.upcomming.length)
        }
        else {
            this.props.history.push("/signin")
        };

        // var p = sessionStorage.getItem("drid");
        // var q = sessionStorage.getItem("cdate");
        this.props.actions.getTodaysAppointments()
        // ////console.log(p, q);
        // var y = sessionStorage.getItem("drid");
        // var z = sessionStorage.getItem("cdate");
        this.props.actions.getfutureappointments()
        // ////console.log(y, z);
        this.props.actions.getclinicRequest()

    }


    componentWillUnmount() {
        ////console.log("in consultation 85...>>>>>>> ")
        this.props.actions.resetNotification(false)


    }


    componentWillReceiveProps(nextProps) {

        if (!Object.is(nextProps.userdetails, this.props.userdetails)) {

            this.props.actions.getPatientRequest(this.props.userdetails.id);
            this.props.actions.getTodaysAppointments()
            this.props.actions.getPastAppointments();
            this.props.actions.getfutureappointments();
            ////console.log(nextProps.upcomming) 
            ////console.log(nextProps.todaysappointments) 
        }
        
    }

    goToConsultationpage = () => {
       
            this.props.history.push("/dashboard/ConsultationPage",{flag:false})
       
        
    }

    render() {
        return (
            <div className="conferdr">

                <div className="bottomnavbar">
                    <div className="firstcontent">
                        <div className="topfix">
                            <div className="topbarpart fordesktopversion">
                                <span className="leftprt hidden-lg">
                                    <NavLink to="/createprofile">
                                        <Icon type="left" className="arrow_back" />
                                    </NavLink>
                                </span>
                                <span className="rightprt">
                                    <Badge className="notificationbadge" count={1}>
                                        <img src={bell} className="mailicon" style={{ marginRight: '20px', marginTop: '5px' }} />
                                    </Badge>

                                    <img src={mail} className="mailicon" />
                                </span>
                                <div className="middletoppart">
                                    <span>
                                        <Badge dot><Avatar shape="circle" icon="user" /></Badge>
                                    </span>
                                    <p className="profilename fordesktop">{this.props.userdetails.name}</p>

                                </div>
                            </div>
                            <p className="profilename formobileview">{this.props.userdetails.name}</p>
                        </div>

                        {/* for MOBILE VIEW start */}
                        <div className="formobileview">
                            <div className="middlepart">
                                <div className="tabcards">
                                    <NavLink to="/dashboard/myclinics">
                                        <Card bordered={true} style={{ width: 310 }} className="firstcard">
                                            <Row gutter={16}>
                                                <Col span={7} style={{ width: '27.5%' }}>
                                                    <div className="firstcard_img">
                                                        <img src={myclinic} className="clinicimg" />
                                                    </div>
                                                </Col>
                                                <Col span={17}>
                                                    <p className="cardtitle">My Clinics</p>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </NavLink>
                                    {/* {this.props.clearNotification.show == true && */}
                                    <Badge count={ (this.props.todaysappointments.length + this.props.upcomming.length)}
                                        // <Badge  count={(this.props.todaysappointments.length + this.props.upcomming.length)}
                                        className="notificationbadge">
                                        {/* <NavLink to="/dashboard/consultation"> */}
                                            <Card bordered={true} style={{ width: 310 }} onClick={this.goToConsultationpage}>
                                                <Row gutter={16}>
                                                    <Col span={7} style={{ width: '27.5%' }}>
                                                        <div className="firstcard_img">
                                                            <img src={consultations} className="clinicimg" />
                                                        </div>
                                                    </Col>
                                                    <Col span={17}>
                                                        <p className="cardtitle">Consultations</p>
                                                        {/* <p className="cardsubtitle"> 2 Clinics Manage</p> */}
                                                    </Col>
                                                </Row>
                                            </Card>
                                        {/* </NavLink> */}
                                    </Badge>
                                    {/* } */}

                                    <NavLink to="/dashboard/AssociateClinics">
                                        <Card bordered={true} style={{ width: 310 }}>
                                            <Row gutter={16}>
                                                <Col span={7} style={{ width: '27.5%' }}>
                                                    <div className="firstcard_img">
                                                        <img src={associateclinics} className="clinicimg" />
                                                    </div>
                                                </Col>
                                                <Col span={17}>
                                                    <p className="cardtitle">Associate Clinics</p>
                                                    {/* <p className="cardsubtitle">2 Clinics Manage</p> */}
                                                </Col>
                                            </Row>
                                        </Card>
                                    </NavLink>


                                    <Badge count={this.props.clinicRequest.length} className="notificationbadge">
                                        <NavLink to="/dashboard/ApproveClinic">
                                            <Card bordered={true} style={{ width: 310 }}>
                                                <Row gutter={16}>
                                                    <Col span={7} style={{ width: '27.5%' }}>
                                                        <div className="firstcard_img">
                                                            <img src={approveclinics} className="clinicimg" />
                                                        </div>
                                                    </Col>
                                                    <Col span={17}>
                                                        <p className="cardtitle">Approve Clinics</p>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </NavLink>
                                    </Badge>
                                    <NavLink to="/dashboard/directappointments">
                                        <Badge count={this.props.patientReqbyId.length} className="notificationbadge">
                                            <Card bordered={true} style={{ width: 310 }}>
                                                <Row gutter={16}>
                                                    <Col span={7} style={{ width: '27.5%' }}>
                                                        <div className="firstcard_img">
                                                            <img src={approveclinics} className="clinicimg" />
                                                        </div>
                                                    </Col>
                                                    <Col span={17}>
                                                        <p className="cardtitle">Direct Appointments</p>
                                                        {/* <p className="cardsubtitle">{}</p> */}
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Badge>
                                    </NavLink>
                                    {/* <Badge count={1} className="notificationbadge">
                                        <Card bordered={true} style={{ width: 310 }}>
                                            <Row gutter={16}>
                                                <Col span={7} style={{ width: '27.5%' }}>
                                                    <div className="firstcard_img">
                                                        <img src={approveclinics} className="clinicimg" />
                                                    </div>
                                                </Col>
                                                <Col span={17}>
                                                    <p className="cardtitle">Direct Appointments</p>
                                                    <p className="cardsubtitle">1 Appointments</p>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Badge>
                                    <Badge count={1} className="notificationbadge">
                                        <Card bordered={true} style={{ width: 310 }}>
                                            <Row gutter={16}>
                                                <Col span={7} style={{ width: '27.5%' }}>
                                                    <div className="firstcard_img">
                                                        <img src={approveclinics} className="clinicimg" />
                                                    </div>
                                                </Col>
                                                <Col span={17}>
                                                    <p className="cardtitle">Direct Appointments</p>
                                                    <p className="cardsubtitle">1 Appointments</p>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Badge>
                                    <Badge count={1} className="notificationbadge">
                                        <Card bordered={true} style={{ width: 310 }}>
                                            <Row gutter={16}>
                                                <Col span={7} style={{ width: '27.5%' }}>
                                                    <div className="firstcard_img">
                                                        <img src={approveclinics} className="clinicimg" />
                                                    </div>
                                                </Col>
                                                <Col span={17}>
                                                    <p className="cardtitle">Direct Appointments</p>
                                                    <p className="cardsubtitle">1 Appointments</p>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Badge> */}
                                </div>
                            </div>
                        </div>
                        {/* for MOBILE VIEW end */}

                        {/* for DESKTOP VIEW start */}
                        <div className="fordesktop spacting hidden-xs">
                            <div className="middlepart">
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <NavLink to="/dashboard/myclinicspage">
                                            <Card bordered={true} style={{ width: 310, float: 'right' }} className="">
                                                <Row gutter={16}>
                                                    <Col span={7} style={{ width: '27.5%' }}>
                                                        <div className="firstcard_img">
                                                            <img src={myclinic_coloured} className="clinicimg" />
                                                        </div>
                                                    </Col>
                                                    <Col span={17}>
                                                        <p className="cardtitle">My Clinics</p>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </NavLink>
                                    </Col>
                                    <Col span={8} className="aligncntr">
                                        {/* <NavLink to="/dashboard/ConsultationPage"> */}
                                            {/* {this.props.clearNotification.show == true && */}
                                            <Badge count={ (this.props.todaysappointments.length + this.props.upcomming.length)} className="notificationbadge">
                                                <Card bordered={true} style={{ width: 310 }}  onClick={this.goToConsultationpage} >
                                                    <Row gutter={16}>
                                                        <Col span={7} style={{ width: '27.5%' }}>
                                                            <div className="firstcard_img">
                                                                <img src={consultations} className="clinicimg" />
                                                            </div>
                                                        </Col>
                                                        <Col span={17} style={{ textAlign: 'left' }}>
                                                            <p className="cardtitle">Consultations</p>
                                                            {/* <p className="cardsubtitle"> 2 Clinics Manage</p> */}
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Badge>
                                        {/* </NavLink> */}
                                    </Col>
                                    <Col span={8} style={{ display: 'flex' }}>

                                        <NavLink to="/dashboard/AssociateClinics">
                                            <Card bordered={true} style={{ width: 310, float: 'right' }}>
                                                <Row gutter={16}>
                                                    <Col span={7} style={{ width: '27.5%' }}>
                                                        <div className="firstcard_img">
                                                            <img src={associateclinics} className="clinicimg" />
                                                        </div>
                                                    </Col>
                                                    <Col span={17}>
                                                        <p className="cardtitle">Associate Clinics</p>
                                                        {/* <p className="cardsubtitle">2 Clinics Manage</p> */}
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </NavLink>

                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={4}></Col>
                                    <Col span={8}>
                                        <Badge count={this.props.clinicRequest.length} className="notificationbadge">
                                            <NavLink to="/dashboard/ApproveClinic">
                                                <Card bordered={true} style={{ width: 310 }}>
                                                    <Row gutter={16}>
                                                        <Col span={7} style={{ width: '27.5%' }}>
                                                            <div className="firstcard_img">
                                                                <img src={approveclinics} className="clinicimg" />
                                                            </div>
                                                        </Col>
                                                        <Col span={17}>
                                                            <p className="cardtitle">Approve Clinics</p>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </NavLink>
                                        </Badge>
                                    </Col>
                                    <Col span={8}>
                                        <NavLink to="/dashboard/directappointments">
                                            <Badge count={this.props.patientReqbyId && this.props.patientReqbyId.length} className="notificationbadge">
                                                <Card bordered={true} style={{ width: 310 }}>
                                                    <Row gutter={16}>
                                                        <Col span={7} style={{ width: '27.5%' }}>
                                                            <div className="firstcard_img">
                                                                <img src={approveclinics} className="clinicimg" />
                                                            </div>
                                                        </Col>
                                                        <Col span={17}>
                                                            <p className="cardtitle">Direct Appointments</p>
                                                            {/* <p className="cardsubtitle">{}</p> */}
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Badge>
                                        </NavLink>
                                    </Col>
                                    <Col span={4}></Col>
                                </Row>
                                <Row gutter={16}>
                                    {/* <Col span={6}>
                                        </Col> */}

                                    {/* <Badge count={1} className="notificationbadge">
                                            <Card bordered={true} style={{ width: 310 }}>
                                                <Row gutter={16}>
                                                    <Col span={7} style={{ width: '27.5%' }}>
                                                        <div className="firstcard_img">
                                                            <img src={approveclinics} className="clinicimg" />
                                                        </div>
                                                    </Col>
                                                    <Col span={17}>
                                                        <p className="cardtitle">Direct Appointments</p>
                                                        <p className="cardsubtitle">1 Appointments</p>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Badge>
                                        <Badge count={1} className="notificationbadge">
                                            <Card bordered={true} style={{ width: 310 }}>
                                                <Row gutter={16}>
                                                    <Col span={7} style={{ width: '27.5%' }}>
                                                        <div className="firstcard_img">
                                                            <img src={approveclinics} className="clinicimg" />
                                                        </div>
                                                    </Col>
                                                    <Col span={17}>
                                                        <p className="cardtitle">Direct Appointments</p>
                                                        <p className="cardsubtitle">1 Appointments</p>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Badge>
                                        <Badge count={1} className="notificationbadge">
                                            <Card bordered={true} style={{ width: 310 }}>
                                                <Row gutter={16}>
                                                    <Col span={7} style={{ width: '27.5%' }}>
                                                        <div className="firstcard_img">
                                                            <img src={approveclinics} className="clinicimg" />
                                                        </div>
                                                    </Col>
                                                    <Col span={17}>
                                                        <p className="cardtitle">Direct Appointments</p>
                                                        <p className="cardsubtitle">1 Appointments</p>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Badge> */}
                                    {/* <Col span={6}>
                                        </Col> */}
                                </Row>
                            </div>
                        </div>
                        {/* for DESKTOP VIEW end */}
                    </div>
                </div>

            </div >
        );
    }
}

//  export default HomeTabPage;

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
    )(HomeTabPage)
);
