
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './MyClinicsPage.css';
import '../Dashboard/Dashboard.css';
import { Button, Card, Form, Icon, Input, Tabs, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import approveclinics from '../../images/Approve-Clinics.png';
// import enhance from '../../images/enhance.jpg';
import '../Dashboard/Dashboard.css';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const TabPane = Tabs.TabPane;

class MyClinicsPage extends Component {
    constructor() {
        super();
        this.state = {
            city: []
        }
    }
    handleChange = value => {
        //console.log(value);
        this.setState({ clinics: value });
    };
    handleChangeclinics = x => {
        //console.log(x);
        this.setState({
            clinics: x
        });
    };


    componentDidMount() {
        this.props.actions.getphysicianclinic()
        // if (this.props.clinics.length===0) {
        //     this.props.history.push("/dashboard")
        // }

    }
    ///// to received new data ///////////////////
//   componentWillReceiveProps(newProps) {

//     if (!Object.is(newProps.clinics, this.props.clinics)) {

//       this.setState({ clinicsArray: newProps.clinics }, () => {
//         console.log(this.state.clinics, "....clinicsArray");
//       })
//     }

//   }


    render() {
        return (
            <div className="conferdr">
                <div className="sectionnamePart fordesktopversion">
                    <NavLink to="/dashboard">
                        <Icon type="left" className="arrow_back hidden-lg" /><span className="titlename">My Clinics</span><i class="fas fa-ellipsis-h arrow_back ellipsis"></i>
                    </NavLink>
                </div>
                <div className="tabsectionPart">
                    <div className="formobileview">
                        <div className="cardsection mycliniccard ">
                        <div className="tabcards">
                            {/* {this.props.clinics.map(x => { */}
                            {/* // return   */}
                            {/* <p value={x.cityname}>{x.cityid}</p>; */}

                            {this.props.clinics.length > 0 &&
                                this.props.clinics.map(element => {

                                    return (
                                        <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }} >


                                            <Row gutter={14}>
                                                <Col span={6}>
                                                    <div className="firstcard_img afterline">
                                                        <img src={approveclinics} className="clinicimg" />
                                                    </div>
                                                </Col>
                                                <Col span={1}>
                                                </Col>
                                                <Col span={16}>

                                                    <p className="personnametext hsptlname" >{element.phyname}</p>
                                                    <p className="bookdetailstext">{element.specializations}</p>
                                                    <p className="bookdetailstext">{element.clinic + " , " + element.cityname} </p>
                                                    <p className="bookedtext">{element.dayslist}</p>

                                                </Col>
                                            </Row>
                                        </Card>
                                    )
                                })}
                            {/* <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }} >
                            
                           
                            <Row gutter={14}>
                                <Col span={6}>
                                    <div className="firstcard_img afterline">
                                        <img src={approveclinics} className="clinicimg" />
                                    </div>
                                </Col>
                                <Col span={1}> */}
                            {/* </Col> */}
                            {/* <Col span={15}>
                               
                                    <p className="personnametext hsptlname" >Hospital</p>
                                    <p className="bookdetailstext">Clinics</p>
                                    <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                   
                        
                                </Col> */}
                            {/* <Col span={1}>
                                    <p className="bookedtext">Sun</p>
                                </Col> */}
                            {/* </Row>
                        </Card> */}
                            {/* })}  */}



                            {/* <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                <Row gutter={14}>
                                    <Col span={6}>
                                        <div className="firstcard_img afterline">
                                            <img src={approveclinics} className="clinicimg" />
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                    <Col span={15}>
                                        <p className="personnametext hsptlname">Hospital</p>
                                        <p className="bookdetailstext">Clinics</p>
                                        <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                        {this.props.city.map(x => {
                                                    return <p value={x.cityname}>{x.cityid}</p>;
                                                })}
                            
                                    </Col>
                                    <Col span={1}>
                                        <p className="bookedtext">Mon</p>
                                    </Col>
                                </Row>
                            </Card>  */}
                            {/* <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                <Row gutter={14}>
                                    <Col span={6}>
                                        <div className="firstcard_img afterline">
                                            <img src={approveclinics} className="clinicimg" />
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                    <Col span={15}>
                                        <p className="personnametext hsptlname">Hospital</p>
                                        <p className="bookdetailstext">Clinics</p>
                                        <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                        {this.props.city.map(x => {
                                                    return <p value={x.cityname}>{x.cityid}</p>;
                                                })}
                            
                                    </Col>
                                    <Col span={1}>
                                        <p className="bookedtext">Mon</p>
                                    </Col>
                                </Row>
                            </Card> 
                            <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                <Row gutter={14}>
                                    <Col span={6}>
                                        <div className="firstcard_img afterline">
                                            <img src={approveclinics} className="clinicimg" />
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                    <Col span={15}>
                                        <p className="personnametext hsptlname">Hospital</p>
                                        <p className="bookdetailstext">Clinics</p>
                                        <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                        {this.props.city.map(x => {
                                                    return <p value={x.cityname}>{x.cityid}</p>;
                                                })}
                            
                                    </Col>
                                    <Col span={1}>
                                        <p className="bookedtext">Mon</p>
                                    </Col>
                                </Row>
                            </Card>
                            <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                <Row gutter={14}>
                                    <Col span={6}>
                                        <div className="firstcard_img afterline">
                                            <img src={approveclinics} className="clinicimg" />
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                    <Col span={15}>
                                        <p className="personnametext hsptlname">Hospital</p>
                                        <p className="bookdetailstext">Clinics</p>
                                        <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                        {this.props.city.map(x => {
                                                    return <p value={x.cityname}>{x.cityid}</p>;
                                                })}
                            
                                    </Col>
                                    <Col span={1}>
                                        <p className="bookedtext">Tue</p>
                                    </Col>
                                </Row>
                            </Card> */}
                        </div>
                    </div>
                </div>
                </div>

                {/* for destop version start */}
                <div className="fordesktop1">
                    <div className="cardsection mycliniccard ">
                        <Row gutter={16}>
                        {this.props.clinics.length > 0 &&
                                this.props.clinics.map(element => {
                                    return(
                            <Col md={8}>
                           
                                <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                    <Row gutter={14}>
                                        <Col span={6}>
                                            <div className="firstcard_img afterline">
                                                <img src={approveclinics} className="clinicimg" />
                                            </div>
                                        </Col>
                                        <Col span={1}>
                                        </Col>
                                        <Col span={16}>
                                            <p className="personnametext hsptlname" >{element.phyname}</p>
                                            <p className="bookdetailstext">{element.specializations}</p>
                                            <p className="bookdetailstext">{element.clinic + " , " + element.cityname} </p>
                                            <p className="bookedtext">{element.dayslist}</p>
                                        </Col>
                                    </Row>
                                </Card>
                                  
                            </Col>
                              )
                            })
                        }
                            {/* <Col md={8}>
                                <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                    <Row gutter={14}>
                                        <Col span={6}>
                                            <div className="firstcard_img afterline">
                                                <img src={approveclinics} className="clinicimg" />
                                            </div>
                                        </Col>
                                        <Col span={1}>
                                        </Col>
                                        <Col span={15}>
                                            <p className="personnametext hsptlname">Hospital</p>
                                            <p className="bookdetailstext">Clinics</p>
                                            <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                        </Col>
                                        <Col span={1}>
                                            <p className="bookedtext">Mon</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                    <Row gutter={14}>
                                        <Col span={6}>
                                            <div className="firstcard_img afterline">
                                                <img src={approveclinics} className="clinicimg" />
                                            </div>
                                        </Col>
                                        <Col span={1}>
                                        </Col>
                                        <Col span={15}>
                                            <p className="personnametext hsptlname">Hospital</p>
                                            <p className="bookdetailstext">Clinics</p>
                                            <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                        </Col>
                                        <Col span={1}>
                                            <p className="bookedtext">Mon</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={8}>
                                <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                    <Row gutter={14}>
                                        <Col span={6}>
                                            <div className="firstcard_img afterline">
                                                <img src={approveclinics} className="clinicimg" />
                                            </div>
                                        </Col>
                                        <Col span={1}>
                                        </Col>
                                        <Col span={15}>
                                            <p className="personnametext hsptlname">Hospital</p>
                                            <p className="bookdetailstext">Clinics</p>
                                            <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                        </Col>
                                        <Col span={1}>
                                            <p className="bookedtext">Mon</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                    <Row gutter={14}>
                                        <Col span={6}>
                                            <div className="firstcard_img afterline">
                                                <img src={approveclinics} className="clinicimg" />
                                            </div>
                                        </Col>
                                        <Col span={1}>
                                        </Col>
                                        <Col span={15}>
                                            <p className="personnametext hsptlname">Hospital</p>
                                            <p className="bookdetailstext">Clinics</p>
                                            <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                        </Col>
                                        <Col span={1}>
                                            <p className="bookedtext">Tue</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <Card bordered={true} className="tabcard" style={{ paddingLeft: '0', width: '322px' }}>
                                    <Row gutter={14}>
                                        <Col span={6}>
                                            <div className="firstcard_img afterline">
                                                <img src={approveclinics} className="clinicimg" />
                                            </div>
                                        </Col>
                                        <Col span={1}>
                                        </Col>
                                        <Col span={15}>
                                      
                                            <p className="personnametext hsptlname">Hospital</p>
                                            <p className="bookdetailstext">Clinics</p>
                                            <p className="bookdetailstext">DemoClinic Bhubnashwar</p>
                                           
                                            
                                        </Col>
                                        <Col span={1}>
                                            <p className="bookedtext">Tue</p>
                                        </Col>
                                    </Row>
                                </Card>  */}
                            {/* </Col>  */}
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

const Wrappedmyclinics = Form.create({ name: 'horizontal_login' })(MyClinicsPage);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Wrappedmyclinics)
);