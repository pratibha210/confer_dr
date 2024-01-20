import React, { Component } from 'react';
import './Dashboard.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Tabs, Drawer, Button, Menu, Icon, Badge, Avatar, Card, Col, Row, Layout } from 'antd';
import home from '../../images/Home.png';
import consult from '../../images/Consultations_menu_ber.png';
import calendar from '../../images/Today.png';
import lead from '../../images/Leads.png';
import menu from '../../images/Menu.png'
import changepassword from '../../images/Change-Password.png';
import associateclinic from '../../images/Associate-Clinic.png';
import privacypolicy from '../../images/Privacy-Policy.png';
import settings from '../../images/Settings.png';
import username from '../../images/Username.png';
import termofuse from '../../images/Terms-of-Use.png';
import logout from '../../images/Log_out.png';
import approverequests from '../../images/Approve-Requests.png';
import myclinic from '../../images/My-Clinics.png';
import consultations from '../../images/Consultations.png';
import associateclinics from '../../images/Associate-Clinics.png';
import approveclinics from '../../images/Approve-Clinics.png';
import bell from '../../images/notification.png';
import mail from '../../images/Massage.png';
import Consultationsmenu from '../../images/Consultationsmenu.png';
import { NavLink } from 'react-router-dom';
import consultation from '../ConsultationPage/ConsultationPage.js';
import NoDataFound from '../Nodatafound/NoDataFound';
import HomeTabPage from '../HomeTabPage/HomeTabPage.js';
import myclinics from '../MyClinicsPage/MyClinicsPage.js';
import formfill from '../FormFill/FormFill.js';
import appointmentdetails from '../AppointmentDetails/AppointmentDetails.js';
import myclinicspage from '../MyClinicsPage/MyClinicsPage';
import AssociateClinics from "../AssociateClinics/AssociateClinics";
import ChangePassword from "../ChangePassword/ChangePasswordPage.js";

import ConsultationPage from "../ConsultationPage/ConsultationPage";
import ApproveClinic from "../ApproveClinic/ApproveClinic";
import directappointments from "../DirectAppointmentPage/directappointment";
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProfileSection from '../ProfilePage/ProfileSection';
import EditProfileSection from '../EditProfilePage/EditProfileSection.js';
import LeadsPage from '../LeadsPage/LeadsPage';


const TabPane = Tabs.TabPane;
const { SubMenu } = Menu;
function callback(key) {
    //console.log(key);
}
const {
    Sider, Content,
} = Layout;
class Dashboard extends Component {
    state = { visible: false, placement: 'left', role: "" };

    showDrawer = () => {
        //console.log("abhjcvsj>>>>>>>>>")
        this.setState({
            visible: true, collapsed: true, flag: false
        });
    };

    onClose = () => {

        this.setState({
            visible: false,

        });
    };

    ///adding Pratibha for routing////


    componentDidMount() {

        //console.log(this.props.location, this.props.location.token);
        //console.log(this.props.location.token);

        if (this.props.location) {
            // this.setState({ role: this.props.location.role });


            sessionStorage.setItem("component", "parent");
            // //console.log("role");

        } else {
            if (sessionStorage.getItem("component") === "parent") {
                if (sessionStorage.getItem("token")) {

                    //console.log(sessionStorage.getItem("token"));
                    this.props.actions.resumesession(
                        sessionStorage.getItem("token"),
                        this.props.history,
                        "dashboard"

                    );

                }
                else {

                    this.props.history.push("/dashboard");
                }
            }
            else if (sessionStorage.getItem("component") === "child") {
                if (sessionStorage.getItem("token")) {
                    //console.log(sessionStorage.getItem("token"));
                    this.props.actions.resumesession(
                        sessionStorage.getItem("token"),
                        this.props.history

                    );

                }
            }
            else {
                this.props.history.push("/signin");
            }

        }


    }


    componentWillReceiveProps(nextProps) {

        if (!Object.is(nextProps.userdetails, this.props.userdetails)) {

            this.props.actions.getPatientRequest(this.props.userdetails.id);
            this.props.actions.getTodaysAppointments()
            this.props.actions.getPastAppointments();
            this.props.actions.getfutureappointments();
        }
    }
    goToTodaypage = () => {
        this.setState({ flag: true },()=>{
            this.props.history.push("/dashboard/ConsultationPage",{flag:true})
       
        })
        
    }
    goToConsultationpage =(page)=>{
        console.log(page)
        switch(page)
        {
            case 'mobileConsult':
                    this.props.history.push("/dashboard/",{flag:false})
                    break;
            case 'mobileToday':
                    this.props.history.push("/dashboard/",{flag:true})
                    break;
                    
            case 'desktopToday':
                    this.props.history.push("/dashboard/ConsultationPage",{flag:true})
                    break;
            default:
                    this.props.history.push("/dashboard/ConsultationPage",{flag:false})
                    break;


        }
    }



    render() {
        const tab1 = <div className="tabsec">
            <img src={home} className="tabicon1" />
            {/* <i class="fas fa-home "></i> */}
            <p className="tabtext">Home</p>
        </div>
        const tab2 = <div className="tabsec" onClick={()=>this.goToConsultationpage('mobileConsult')}>
            <img src={consult} className="tabicon2" />
            {/* <i class="far fa-user tabicon"></i> */}
            <p className="tabtext" >Consultations </p>
        </div>
        const tab3 = <div className="tabsec" onClick={()=>this.goToConsultationpage('mobileToday')}>
            {/* <NavLink to="/dashboard/directappointments"> */}
            <Badge count={this.props.todaysappointments.length} className="todaybadge">
                <img src={calendar} className="tabicon3" />
            </Badge>
            {/* <i class="far fa-calendar-alt tabicon"></i> */}
            <p className="tabtext">Today</p>
            {/* </NavLink> */}
        </div>
        const tab4 = <div className="tabsec">
            <img src={lead} className="tabicon4" />
            {/* <i class="far fa-calendar-plus tabicon"></i> */}
            <p className="tabtext">Leads</p>
        </div>
        return (
            <div className="conferdr">
                <Layout className="layoutsec">
                    <Sider className="fordesktop">
                        {/*-------------------- SIDEBAR part start------------------------------- */}
                        <div>
                            <div className="sidenavbarpart fordesktop">
                                <Menu className="dashboardmenulist"
                                    onClick={this.handleClick}
                                    style={{ width: 270 }}
                                    defaultSelectedKeys={['1']}
                                    mode="inline"
                                >
                                    <div className="navbartoppart">
                                        {/* <span>
                                            <Badge dot><Avatar shape="circle" icon="user" /></Badge>
                                        </span>
                                        <p className="profiletext"> <Icon type="edit" className="editicon" />My Profile</p> */}
                                        <h1>Confer<span className="colorchng">Dr</span></h1>
                                    </div>
                                    <hr className="light" />
                                    <Menu.Item key="1" style={{ marginTop: '30px' }} className="menuitem menuitem1">
                                        <NavLink to="/dashboard/home">
                                            <img src={home} />
                                            <span>Home</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="2" className="menuitem menuitem1" onClick={()=>this.goToConsultationpage()}>
                                        {/* <NavLink to="/dashboard/ConsultationPage"> */}
                                            <img src={Consultationsmenu} />
                                            <span>Consultations</span>
                                        {/* </NavLink> */}
                                    </Menu.Item>
                                    <Menu.Item key="3" className="menuitem menuitem1" onClick={()=>this.goToConsultationpage('desktopToday')}>
                                        {/* <NavLink to="/dashboard/ConsultationPage"> */}
                                        <Badge count={this.props.todaysappointments.length} className="todaybadge todaymenu">
                                            <img src={calendar} />
                                        </Badge>
                                        <span>Today</span>

                                        {/* </NavLink> */}
                                    </Menu.Item>
                                    <Menu.Item key="4" className="menuitem menuitem1">
                                        <NavLink to="/dashboard/leadspage">
                                            <img src={lead} />
                                            <span>Leads</span>
                                        </NavLink>
                                    </Menu.Item>

                                    <Menu.Item key="5" className="menuitem menuitem3">
                                        <NavLink to="/dashboard/AssociateClinics">
                                            <img src={associateclinic} />
                                            <span>Associate Clinic</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="6" className="menuitem menuitem4">
                                        <NavLink to="/dashboard/ApproveClinic">
                                            <img src={approverequests} />
                                            <span>Approve Requests</span>
                                        </NavLink>
                                    </Menu.Item>
                                    {/* <Menu.Item key="5" className="menuitem menuitem5">
                                        <NavLink to="/dashboard/nodata">
                                            <img src={termofuse} />
                                            <span>Terms of Use</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="6" className="menuitem menuitem6">
                                        <NavLink to="/dashboard/nodata">
                                            <img src={privacypolicy} />
                                            <span>Privacy Policy</span>
                                        </NavLink>
                                    </Menu.Item> */}
                                    <p className="accountsettingtext">
                                        <span>Account Settings</span></p>
                                    <Menu.Item key="7" className="menuitem menuitem2">
                                        <NavLink to="/dashboard/profilepage">
                                            <img src={username} />

                                            <span>My Profile</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="8" className="menuitem menuitem2">
                                        <NavLink to="/dashboard/ChangePassword">
                                            <img src={changepassword} />
                                            <span>Change Password</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="9" className="menuitem menuitem7">
                                        <NavLink to="/dashboard/nodata">
                                            <img src={settings} />
                                            <span>Settings</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="10"
                                        className="menuitem menuitem8"
                                        onClick={() => {
                                            sessionStorage.clear();
                                            this.props.actions.resetNotification("true")

                                        }}>
                                        <NavLink to="/signin">
                                            <img src={logout} />
                                            <span>Log Out</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <div className="privacytermssection">
                                        <NavLink to="/dashboard/nodata">
                                            <p className="termstextinmenu">Terms of Use</p>
                                        </NavLink>
                                        <NavLink to="/dashboard/nodata">
                                            <p className="termstextinmenu">Privacy Policy</p>
                                        </NavLink>
                                    </div>
                                </Menu>
                            </div>
                        </div>
                        {/*----------------------- SIDEBAR part end-------------------------------- */}
                    </Sider>
                    <Content>
                        {/*------------------ Footer Part start----------------------- */}
                        <div className="bottomnavbar hidden-lg">
                            <div className="menudiv formobileview" onClick={this.showDrawer}  >
                                <div className="tabsec" >
                                    <img src={menu} className="menubar" />

                                    {/* <i class="fas fa-bars tabicon" onClick={this.toggleCollapsed}></i> */}
                                    <p className="tabtext">Menu</p>
                                </div>
                            </div>
                            {/* <button onClick={this.showDrawer}>test</button> */}
                            <Drawer
                                placement="left"
                                closable={false}
                                onClose={this.onClose}
                                visible={this.state.visible}
                            >
                                <div className="sidenavbarpart">
                                    <Menu
                                        onClick={this.handleClick}
                                        style={{ width: 256 }}
                                        mode="inline"
                                    >
                                        <div className="navbartoppart">
                                            <Icon type="left" className="backarrow" onClick={this.onClose} />
                                            <span>
                                                <Badge dot><Avatar shape="circle" icon="user" /></Badge>
                                            </span>
                                            <p className="profiletext"> <Icon type="edit" className="editicon" />My Profile</p>
                                        </div>
                                        <hr className="light" />
                                        <Menu.Item key="1" style={{ marginTop: '14px' }} className="menuitem menuitem1">
                                            <NavLink to="/dashboard">
                                                <img src={home} />
                                                <span>Home</span>
                                            </NavLink>
                                        </Menu.Item>

                                        <Menu.Item key="3" className="menuitem menuitem3">
                                            <NavLink to="/dashboard/AssociateClinics">
                                                <img src={associateclinic} />
                                                <span>Associate Clinic</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="4" className="menuitem menuitem4">
                                            <NavLink to="/dashboard/ApproveClinic">
                                                <img src={approverequests} />
                                                <span>Approve Requests</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <p className="accountsettingtext">
                                            <span>Account Settings</span></p>
                                        {/* <Menu.Item key="5" className="menuitem menuitem5">
                                            <img src={termofuse} />
                                            <span>Terms of Use</span>
                                        </Menu.Item>
                                        <Menu.Item key="6" className="menuitem menuitem6">
                                            <img src={privacypolicy} />
                                            <span>Privacy Policy</span>
                                        </Menu.Item> */}
                                        <Menu.Item key="7" className="menuitem menuitem2">
                                            <NavLink to="/dashboard/profilepage">
                                                <img src={username} />
                                                <span>My Profile</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="2" className="menuitem menuitem2">
                                            <NavLink to="/dashboard/ChangePassword">
                                                <img src={changepassword} />
                                                <span>Change Password</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="7" className="menuitem menuitem7">
                                            <img src={settings} />
                                            <span>Settings</span>
                                        </Menu.Item>
                                        <Menu.Item key="8"
                                            className="menuitem menuitem8"
                                            onClick={() => {
                                                sessionStorage.clear();
                                                this.props.actions.resetNotification("true")

                                            }}>
                                            <NavLink to="/signin">
                                                <img src={logout} />
                                                <span>Log Out</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <div className="privacytermssection">
                                            <NavLink to="/dashboard/nodata">
                                                <p className="termstextinmenu">Terms of Use</p>
                                            </NavLink>
                                            <NavLink to="/dashboard/nodata">
                                                <p className="termstextinmenu">Privacy Policy</p>
                                            </NavLink>
                                        </div>



                                    </Menu>
                                </div>
                            </Drawer>
                            <Tabs tabPosition="bottom" className="tabspanel dashboardtab" defaultActiveKey="1" onChange={callback}>
                                {/* <TabPane tab={tab1} key="1"></TabPane> */}
                                <TabPane tab={tab1} key="1">
                                    <Switch>
                                        {/* child component start */}
                                        {/* <Route exact path={`${this.props.match.url}/dashboard`} component={JobList} /> */}
                                        <Route exact path={`${this.props.match.url}`} component={HomeTabPage} />
                                        <Route exact path={`${this.props.match.url}/ConsultationPage`} 
                                        // component={consultation}
                                         render={()=>
                                            <ConsultationPage flag={this.state.flag} />
                                        }/>
                                        <Route exact path={`${this.props.match.url}/directappointments`} component={directappointments} />
                                        <Route exact path={`${this.props.match.url}/appointmentdetails`} component={appointmentdetails} />
                                        <Route exact path={`${this.props.match.url}/associateclinics`} component={AssociateClinics} />
                                        <Route exact path={`${this.props.match.url}/changepassword`} component={ChangePassword} />
                                        <Route exact path={`${this.props.match.url}/approveclinic`} component={ApproveClinic} />
                                        <Route exact path={`${this.props.match.url}/myclinics`} component={myclinics} />
                                        <Route exact path={`${this.props.match.url}/formfill`} component={formfill} />
                                        <Route exact path={`${this.props.match.url}/profilepage`} component={ProfileSection} />
                                        <Route exact path={`${this.props.match.url}/editprofilepage`} component={EditProfileSection} />
                                        <Route exact path={`${this.props.match.url}/leadspage`} component={LeadsPage} />

                                    </Switch>
                                </TabPane>
                                <TabPane tab={tab2} key="2">
                                    <Switch>
                                        {/* child component start */}
                                        {/* <Route exact path={`${this.props.match.url}/dashboard`} component={JobList} /> */}
                                        {/* <Route exact path={`${this.props.match.url}`} 
                                        // component={consultation} 
                                        render={()=>
                                            <ConsultationPage flag={this.state.flag} />
                                        }/> */}
                                        <Route exact path={`${this.props.match.url}`} 
                                        // component={consultation}
                                        render={()=>
                                            <ConsultationPage />
                                        } />
                                    </Switch>
                                </TabPane>
                                <TabPane tab={tab3} key="3">
                                <Switch>
                                        <Route exact path={`${this.props.match.url}`} component={ConsultationPage} />
                                        <Route exact path={`${this.props.match.url}/ConsultationPage`} component={ConsultationPage} />
                                    </Switch>
                                    {/* <Switch>
                                        <Route exact path={`${this.props.match.url}`} component={directappointments} />
                                        <Route exact path={`${this.props.match.url}/directappointments`} component={directappointments} />
                                    </Switch> */}
                                </TabPane>
                                <TabPane tab={tab4} key="4">
                                    <Switch>
                                        <Route exact path={`${this.props.match.url}`} component={NoDataFound} />
                                    </Switch>
                                </TabPane>
                            </Tabs>
                            <Switch>
                                <Route exact path={`${this.props.match.url}/home`} component={HomeTabPage} />
                                <Route exact path={`${this.props.match.url}/nodata`} component={NoDataFound} />

                            </Switch>
                        </div>

                        <div className="fordesktop">
                            <Switch>
                                <Route exact path={`${this.props.match.url}/ConsultationPage`}
                                    render={()=>
                                        <ConsultationPage flag={this.state.flag} />
                                    }
                                // component={ConsultationPage} 
                                />
                                <Route exact path={`${this.props.match.url}/home`} component={HomeTabPage} />
                                <Route exact path={`${this.props.match.url}/nodata`} component={NoDataFound} />
                                <Route exact path={`${this.props.match.url}/profilepage`} component={ProfileSection} />
                                <Route exact path={`${this.props.match.url}/myclinicspage`} component={myclinicspage} />
                                <Route exact path={`${this.props.match.url}`} component={HomeTabPage} />
                                <Route exact path={`${this.props.match.url}/directappointments`} component={directappointments} />
                                <Route exact path={`${this.props.match.url}/appointmentdetails`} component={appointmentdetails} />
                                <Route exact path={`${this.props.match.url}/formfill`} component={formfill} />
                                <Route exact path={`${this.props.match.url}/AssociateClinics`} component={AssociateClinics} />
                                <Route exact path={`${this.props.match.url}/ChangePassword`} component={ChangePassword} />
                                <Route exact path={`${this.props.match.url}/ApproveClinic`} component={ApproveClinic} />
                                <Route exact path={`${this.props.match.url}/editprofilepage`} component={EditProfileSection} />
                                <Route exact path={`${this.props.match.url}/leadspage`} component={LeadsPage} />

                            </Switch>
                        </div>
                        {/*------------------ Footer Part end----------------------- */}
                    </Content>
                </Layout>
            </div>
        );
    }
}

// export default Dashboard;



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
    )(Dashboard)
);

