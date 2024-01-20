import React, { Component } from 'react';
import './ApproveClinic.css';
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import { Button, Card, Form, Icon, Input, Tabs, Row, Col, Avatar, Badge, Select, Upload, message, } from 'antd';
import Username from "../../images/Username.png";
import error from "../../images/error.png";
import verified from "../../images/verified.png"
import ApproveClinics from "../../images/Approve-Clinics.png"
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';



class ApproveClinic extends Component {
    // state={requestList:[]}
    constructor(props) {
        super(props);
        this.state = {
            requestList: []
        }

    };

    componentDidMount() {
        //console.log(this.props.userdetails);
        // if(Object.keys(this.props.userdetails)>0){
        this.props.actions.getclinicRequest(this.props.userdetails.id)
        // if (this.props.clinicRequest.length===0) {
        //     this.props.history.push("/dashboard")
        // }
    // }
}
    componentWillReceiveProps(nextProps) {
        // //console.log(nextProps.clinicRequest)
        if (!Object.is(nextProps.userdetails, this.props.userdetails)) {
        this.props.actions.getclinicRequest(this.props.userdetails.id)
        }
        if (!Object.is(nextProps.clinicRequest, this.props.clinicRequest)) {
            this.setState({
                requestList: nextProps.clinicRequest
            }
                )
        }
    }
    accept = (e) => {
        //console.log(e);
        //     if(this.props.acceptRequest===""){
        //     //console.log("accepted successfully");
        //     } else{
        this.props.actions.acceptClinicRequest(e.id)
        // this.props.acceptRequest._id );
        // }
    };



    reject = (e) => {
        //console.log(e)
        this.props.actions.deleteClinicRequest(e.id)
    }



    render() {
        //console.log(this.state.requestList)
        return (
            <div className="conferdr">
                <div className="sectionnamePart fordesktopversion approveclinic">
                    <NavLink to="/dashboard">
                        <Icon type="left" className="arrow_back hidden-lg" /><span className="titlename">Approve Clinic</span>
                    </NavLink>
                </div>
                <div className="approvcliniccontent">
                    {/* {this.state.requestList.error==true && <p>{this.state.requestList.errormsg}</p>} */}
                    <Row gutter={18}>
                        {
                            this.state.requestList.length === 0 &&
                            <p className="norequestsclinic"> No requests found! </p>
                        }
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            {/* {
                            this.state.requestList.length===0 &&
                            <p className="norequestsclinic"> No requests found! </p>
                        } */}
                            {
                                this.state.requestList.map(x => {
                                    return (
                                        <div className="aprovcliniccrd">
                                            <Row gutter={18}>
                                                <Col xs={6} sm={6} md={4} lg={4} xl={5}>
                                                    <div className="userimg">
                                                        <img src={Username} />
                                                    </div>
                                                </Col>
                                                <Col xs={12} sm={12} md={16} lg={16} xl={14}>
                                                    <div className="crdtxt">
                                                        <h3>{x.clinicname}</h3>
                                                        <p>{x.clinicaddress}</p>
                                                    </div>
                                                </Col>
                                                <Col xs={6} sm={6} md={4} lg={4} xl={5}>
                                                    <div className="cardbutn">
                                                        <Button onClick={() => this.reject(x)} className="crosrghtbtn"><span><img src={error} /></span></Button>

                                                        {/* <p>{this.props.clinicRequest.Message}</p> */}
                                                        <Button
                                                            onClick={() => this.accept(x)} className="crosrghtbtn"><span><img src={verified} />
                                                            </span></Button>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })}

                        </Col>

                        {/* <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                 <div className="aprovcliniccrd">
                <Row gutter={18}>
                <Col xs={6} sm={6} md={4} lg={4} xl={5}>
                    <div className="userimg">
                        <img src={ApproveClinics}/>
                    </div>
                    </Col>
                    <Col xs={12} sm={12} md={16} lg={16} xl={14}>
                    <div className="crdtxt">
                        <h3>R. Kundu</h3>
                        <p>Lorem Ipsum</p>
                    </div>
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={5}>
                    <div className="cardbutn">
                        <Button  className="crosrghtbtn"><span><img src={error}/></span></Button>
                        <Button onClick={this.accept} className="crosrghtbtn"><span><img src={verified}/></span></Button>
                    </div>
                    </Col>
                </Row>
              </div>
              </Col> */}

                    </Row>
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
    )(ApproveClinic)
);

// export default ApproveClinic;
