
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './profile.css';
import '../Dashboard/Dashboard.css';
import { Button, Card, Form, Icon, Input, Tabs, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import approveclinics from '../../images/Approve-Clinics.png';
// import enhance from '../../images/enhance.jpg';
import '../Dashboard/Dashboard.css';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import personal from '../../images/personal.png';
import contact from '../../images/contact.png';
import address from '../../images/home-address.png';

const TabPane = Tabs.TabPane;

class ProfileSection extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }


    componentDidMount() {
        //console.log(this.props.userdetails);
        this.setState({userData: this.props.userdetails})
      }
     
    
    render() {
        return (
            <div className="conferdr">
                <div className="sectionnamePart fordesktopversion">
                    <NavLink to="/dashboard">
                        <Icon type="left" className="arrow_back hidden-lg" /><span className="titlename">My Profile</span>
                        {/* <i class="fas fa-ellipsis-h arrow_back ellipsis"></i> */}
                       
                    </NavLink>
                    <NavLink to="/dashboard/editprofilepage">
                        <Button type="primary" htmlType="submit" className="editprofile-button">
                            Edit Profile
                                       </Button>
                                       </NavLink>
                </div>
                {/* <div className="tabsectionPart">
                    <div className="formobileview">
                        <div className="cardsection mycliniccard ">
                            <div className="tabcards">
                                <p>My Profile page</p>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* for destop version start */}
                {/* <div className="fordesktop1"> */}
                    <div className="cardsection mycliniccard ">
                        <p className="profiledetailsectiontitle">
                            <img src={personal} className="persondetailimg" />Personal Details</p>
                        <div className="profiledetailsectiontextstart">
                            <p className="profilepara"><span className="profileparatitle">User Name : </span><span>{this.props.userdetails?this.props.userdetails.name:null}</span></p>
                            <p className="profilepara"><span className="profileparatitle">Gender : </span><span>{this.props.userdetails?this.props.userdetails.gender:null}</span></p>
                            <p className="profilepara"><span className="profileparatitle">Blood Group : </span><span>{this.props.userdetails?this.props.userdetails.bloodgroup:""}</span></p>

                        </div>
                        <p className="profiledetailsectiontitle">
                            <img src={contact} className="persondetailimg" />Contact Details</p>
                        <div className="profiledetailsectiontextstart">
                            <p className="profilepara"><span className="profileparatitle">Contact Number : </span><span>{this.props.userdetails?this.props.userdetails.contactno:null}</span></p>
                            <p className="profilepara"><span className="profileparatitle">Email : </span><span>{this.props.userdetails?this.props.userdetails.email:null}</span></p>

                        </div>
                        <p className="profiledetailsectiontitle">
                            <img src={address} className="persondetailimg" />Address Details</p>
                        <div className="profiledetailsectiontextstart">
                            <p className="profilepara"><span className="profileparatitle">Address : </span><span>{this.props.userdetails?this.props.userdetails.address:null}</span></p>

                        </div>
                    </div>
                {/* </div> */}
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

const Wrappedmyprofile = Form.create({ name: 'horizontal_login' })(ProfileSection);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Wrappedmyprofile)
);