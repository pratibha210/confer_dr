import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './ResetPasswordForm.css';
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
            useremail: []
        };
    }

    getQueryStringValue = (key) => {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key)
            .replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    componentDidMount() {

        let query = this.getQueryStringValue("verify_token");
        console.log(query);
        //// verify Token API call ///////
        let formData = new FormData();
        formData.append("verify_token", query);


        for (var pair of formData.entries()) {
            //console.log(pair[0] + ', ' + pair[1]);
        }
        const config = {
            method: 'POST',
            body: formData,

        }
        fetch(process.env.REACT_APP_apiurl + "/restapi/Password/checktokenforresetpwd/", config)
            .then(result =>
                //  //console.log(result))
                result.json())
            .then(result => {
                // console.log(result);
                if (result.success === 1) {
                   
                    this.setState({useremail:result.result})
                    openNotificationWithIcon('success','Token veryfied Successfully!!');
                }
                else {
                   
                    this.props.history.replace('/signin')
                    openNotificationWithIcon('error','Tiken veryfied Error, Pushed to Login');
                }

            })
            .catch(err => {
                // console.log(err);
            });


    }


    handleSubmit = (e) => {
        e.preventDefault();
     
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);

                if (values.confirmpassword !== values.password) {
                    this.setState({
                        nonmatchingpassword: true
                    })
                }
                else {
                    //console.log('Received values of form: ', values);
                    this.setState({
                        nonmatchingpassword: false
                    })

                    ////////// reset password API call ///////

                    let formData = new FormData();
                    formData.append("email", this.state.useremail[0].email);
                    formData.append("password", values.password);


                    for (var pair of formData.entries()) {
                        // console.log(pair[0] + ', ' + pair[1]);
                    }
                    const config = {
                        method: 'POST',
                        body: formData,

                    }
                    fetch(process.env.REACT_APP_apiurl + "/restapi/Password/resetpassword/", config)
                        .then(result =>
                            
                            result.json())
                        .then(result => {
                            // console.log(result);
                            if (result.success === 1) {
                                //console.log(result);
                                this.props.history.replace('/signin');
                                openNotificationWithIcon('success','Password Reset Successfully!!');
                            }
                            else {
                                openNotificationWithIcon('error','Password Reset error !!');
                            

                            }

                        })
                        .catch(err => {
                            //console.log(err);
                        });

                }

            }
            else {
                //console.log("errorr");
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
                        <p className="signinheader">Reset Password</p>
                        <Card className="logincard forgotpw" bordered={false}>
                            <div className="loginfirst">

                                <Form onSubmit={this.handleSubmit} className="login-form loginFormNew resetpw">
                                    {this.props.error && <p className="error"> {this.props.error}</p>}

                                    <Form.Item className="paddingbt"
                                    >
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input prefix={<img src={lockicon} className="inputicon" />} placeholder="New Password" type="password" style={{ borderWidth: '1px' }} />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        {getFieldDecorator('confirmpassword', {
                                            rules: [{ required: true, message: 'Please re-enter your Password!' }],
                                        })(
                                            <Input prefix={<img src={lockicon} className="inputicon" />} placeholder="Confirm Password" type="password" style={{ borderWidth: '1px' }} />
                                        )}
                                        {this.state.nonmatchingpassword === true && <p> password and confirm passwords do not match!! </p>}
                                    </Form.Item>


                                    {/* <p className="textcenter frgetpwd">ForEmailgot Password ?<div onClick={() => { this.forgotpassword() }} className="forgot">  <span>Click here</span></div></p>  */}

                                    <div className="textcenter">
                                        {/* <NavLink to="/signin"> */}
                                        <Button type="primary" htmlType="submit" className="resetpw-form-button">
                                            Reset
                                       </Button>
                                        {/* </NavLink> */}
                                    </div>

                                </Form>
                            </div>
                        </Card>
                    </div>

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
