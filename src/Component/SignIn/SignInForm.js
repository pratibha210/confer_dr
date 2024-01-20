import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SignInForm.css';
import emailicon from '../../images/Email.png';
import usericon from '../../images/Username.png';
import lockicon from '../../images/Password.png';
import privacyicon from '../../images/Privacy.png';
import { Button, Card, Form, Icon, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import openNotificationWithIcon from '../../Common/UiComponent/AlertComponent';

class SignInForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errorMessage:'',
            showerror: false
        };
    }

  

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(e)
        //console.log(this.props.form)

    this.props.form.validateFields((err, values) => {
     if (!err) {
        
        this.props.actions.loginUser(values,this.props.history)
       
     }
  });
 }

 componentWillReceiveProps(nextProps) {
    // //console.log(nextProps.clinicRequest)
    if (!Object.is(nextProps.error, this.props.error)) {
        this.setState({
            errorMessage: nextProps.error,
            showerror: true
        }
        // , () => { //console.log(this.state.errorMessage) }
        )
    }
}

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="conferdr">
           
                <div className="loginpage">
                    <div className="bgColor">
                    </div>
                    <div className="loginpg">
                        <p className="signinheader">Sign in</p>
                        <Card className="logincard" bordered={false}>
                            <div className="loginfirst">
                                <Form onSubmit={this.handleSubmit} className="login-form loginFormNew">
                                {this.state.showerror && <p className="error"> {this.state.errorMessage}</p>}
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Please input your email!' }],
                                        })(
                                            <Input prefix={<img src={usericon} className="inputicon"/>} placeholder="Email" autocomplete="off" />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input prefix={<img src={lockicon} className="inputicon"/>} placeholder="Password" type="password" style={{borderWidth:'1px'}}/>
                                        )}
                                    </Form.Item>
                                    <NavLink to="/forgotpassword"> 
                                    <p className="forgotpaswrdtext">Forgot Password ? </p>
                                    </NavLink> 
                                    <div className="textcenter">
                            {/* <p className="continuetext">or continue with</p> */}
                            </div> 
                                     {/* <p className="textcenter frgetpwd">Forgot Password ?<div onClick={() => { this.forgotpassword() }} className="forgot">  <span>Click here</span></div></p>  */}
                                
                                <div className="textcenter">
                                    {/* <NavLink to="/dashboard"> */}
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Sign in
                                       </Button>
                                    {/* </NavLink> */}
                                    <p className="privacytext"><img src={privacyicon} className="privacyicon"/><span className="underline">All T&C and Privacy</span></p>
                                 </div>
                            
                            </Form>
                            </div>
                        </Card>
                    </div>
                   
                    <p className="registertext">Don't have an account ? 
                    <NavLink to="/signup"> 
                    <span className="clickingelement"> Sign up</span>
                     </NavLink> 
                    </p>
                </div>
            </div>
   
    );

    }
}
// const WrappedLogin = Form.create({ name: 'horizontal_login' })(SignInForm);
// export default withRouter(WrappedLogin)


const mapStateToProps = state => {
    return state;
};

function mapDispatchToProps(dispatch, state) {
    return {
        actions: bindActionCreators(actioncreators, dispatch)
    };
}

const WrappedLogin = Form.create({ name: 'horizontal_login' })(SignInForm);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WrappedLogin)
);
