import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './ForgotPasswordForm.css';
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
class ForgotPasswordForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            message: "",
            showerrormessage:false,
            errorMessage: "",
            success: ""
           
        };
    }

    componentWillReceiveProps(nextProps) {
        // //console.log(nextProps.clinicRequest)
        if (!Object.is(nextProps.error, this.props.error)) {
            this.setState({
                errorMessage: nextProps.error,
                showerrormessage: true
            }
            // , () => { //console.log(this.state.errorMessage) }
            )
        }
    }
  
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(e)
        //console.log(this.props.form)

        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);

                let formData = new FormData();
                formData.append("email", values.email);


                for (var pair of formData.entries()) {
                    //console.log(pair[0] + ', ' + pair[1]);
                }
                const config = {
                    method: 'POST',
                    body: formData,

                }
                fetch(process.env.REACT_APP_apiurl + "/restapi/Password/resetpasswordcdr/", config)
                    .then(result =>
                        //  //console.log(result))
                        result.json())
                    .then(result => {
                        console.log(result);
                        if (result.success === 1) {
                        //    const type ="success";
                          openNotificationWithIcon('success','Please check your email for further proccess');
                      
                        }
                        else {
                            openNotificationWithIcon('error','This email id is not registered');
                        }

                    })
                    .catch(err => {
                        //console.log(err);
                    });

            }
        });
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="conferdr">
                <div className="loginpage">
                    <div className="bgColor">
                    </div>
                    <div className="loginpg">
                        <p className="signinheader">Forgot Password</p>
                        <Card className="logincard forgotpw" bordered={false}>
                            <div className="loginfirst">

                                <Form onSubmit={this.handleSubmit} className="login-form loginFormNew">
                                    {this.state.showerrormessage && <p className="error"> {this.state.message}</p>}
                                    <p className="usermessage"> Please enter your registered email address, and we'll send a link to reset your password</p>
                                    {this.state.showerrormessage && <p className="error"> {this.state.errorMessage}</p>}

                                    <Form.Item
                                        className="paddingbt forgotpw"
                                    >
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Please input your email!' }],
                                        })(
                                            <Input prefix={<img src={usericon} className="inputicon" />} placeholder="Email" autocomplete="off" />
                                        )}
                                    </Form.Item>

                                    {/* <div className="textcenter">
                            
                            </div>  */}
                                    {/* <p className="textcenter frgetpwd">ForEmailgot Password ?<div onClick={() => { this.forgotpassword() }} className="forgot">  <span>Click here</span></div></p>  */}

                                    <div className="textcenter">
                                        {/* <NavLink to="/resetpassword"> */}
                                        <Button type="primary" htmlType="submit" className="forgotpw-form-button">
                                            Submit
                                       </Button>
                                        {/* </NavLink> */}
                                    </div>

                                </Form>
                            </div>
                        </Card>
                    </div>
                    <p className="registertext">Back To Login!
                    <NavLink to="/signin">
                            <span className="clickingelement"> Sign in</span>
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

const WrappedLogin = Form.create({ name: 'horizontal_login' })(ForgotPasswordForm);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WrappedLogin)
);
