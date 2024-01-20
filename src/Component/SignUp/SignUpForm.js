import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../SignIn/SignInForm.css';
import './SignUpForm.css'
import usericon from '../../images/Username.png';
import lockicon from '../../images/Password.png';
import emailicon from '../../images/Email.png';
import mobileicon from '../../images/Mobile.png';
// import City from '../../images/City.png';
// import Address from '../../images/Address.png';
// import licence_id_v3 from '../../images/licence_id_v3.png';
// import Remark from '../../images/Remark.png';
import { Button, Card, Form, Icon, Input, Popover, Select } from 'antd';
import { NavLink } from 'react-router-dom';
// import * as actioncreators from "../../redux/action";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

const Option = Select.Option;
function handleChange(value) {
    //console.log(`selected ${value}`);
}

function handleBlur() {
    //console.log('blur');
}

function handleFocus() {
    //console.log('focus');
}
class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nonmatchingpassword: false,
            // loading: false
        }
    }

    handleSubmit = (e) => {

        e.preventDefault();
        // //console.log(this.props.data);


        this.props.form.validateFields((err, values) => {


            if (!err) {
                //console.log('Received values of form: ', values);

                if (values.confirmpassword !== values.password) {
                    this.setState({
                        nonmatchingpassword: true
                    })
                }
                else {
                    this.props.history.push({
                        pathname: "/createprofile",
                        from: "signup",
                        data: values
                    })
                }

            }
            else {
                values.description = this.props.value;
                //console.log(values, "goes in db");
            }
        }
        );

    };
   


    render() {
        const { getFieldDecorator } = this.props.form;
        const content = (
            <div>
                <ul style={{ paddingLeft: '11px', marginBottom: '0' }}>
                    <li className="infotext">Include both lower and upper case characters</li>
                    <li className="infotext">Include at least one number or symbol</li>
                    <li className="infotext">Be at least 8 characters long</li>
                </ul>
                {/* <p className="infotext">Include both lower and upper case characters</p>
                <p className="infotext">Include at least one number or symbol</p>
                <p className="infotext">Be at least 8 characters long</p> */}



            </div>
        );
        return (
            <div className="conferdr">
                <div className="loginpage registerpage">
                    <div className="bgColor">
                    </div>
                    <div className="loginpg registerpg">
                        <p className="signinheader">Sign up</p>
                        <Card className="logincard registervard" bordered={false}>
                            <div className="loginfirst">
                                <Form onSubmit={this.handleSubmit} className="login-form loginFormNew">

                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('username', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input prefix={<img src={usericon} className="inputicon" />} placeholder="Username" autocomplete="off" />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Please input your email!' }],
                                        })(
                                            <Input prefix={<img src={emailicon} className="inputicon" />} placeholder="Email" autocomplete="off" type="email" />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('phno', {
                                            rules: [{ required: true, message: 'Please input your mobile number!' },
                                            {
                                                len: 10,
                                                message: "Phone number should be of ten digits"
                                            },

                                            ],
                                        })
                                            (
                                                <Input prefix={<img src={mobileicon} className="mobileicon" />} placeholder="Mobile Number" autocomplete="off" type="number" />
                                            )}
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            // <Popover placement="bottom" content={content} trigger="click">
                                            <Input prefix={<img src={lockicon} className="inputicon" />} placeholder="Password" type="password" style={{ borderWidth: '1px' }} />
                                            // </Popover>
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        {getFieldDecorator('confirmpassword', {
                                            rules: [{ required: true, message: 'Please cofirm your Password!' }],
                                        })(

                                            <Input prefix={<img src={lockicon} className="inputicon" />} placeholder="Confirm Password" type="password" style={{ borderWidth: '1px' }} />
                                        )}

                                        {this.state.nonmatchingpassword === true && <p> password and confirm passwords do not match!! </p>}
                                    </Form.Item>
                                    {/* <Form.Item className="paddingbt">
                                        <Select
                                            showSearch
                                            // style={{ width: 200 }}
                                            placeholder="Select a city"

                                            optionFilterProp="children"
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="jack">Kolkata</Option>
                                            <Option value="lucy">Delhi</Option>
                                            <Option value="tom">Mumbai</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('address', {
                                            rules: [{ required: true, message: 'Please input your address!' }],
                                        })(
                                            <Input prefix={<img src={Address} className="inputicon" />} placeholder="Address" autocomplete="off" />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('licenceid', {
                                            rules: [{ required: true, message: 'Please input your licenceid' }],
                                        })(
                                            <Input prefix={<img src={licence_id_v3} className="inputicon licenceicn" />} placeholder="Licenceid" autocomplete="off" />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('remark', {
                                            rules: [{ required: true, message: 'Please input your remark' }],
                                        })(
                                            <Input prefix={<img src={Remark} className="inputicon" />} placeholder="Remark" autocomplete="off" />
                                        )}
                                    </Form.Item> */}
                                    <Form.Item>
                                        <div className="textcenter">
                                            {/* <NavLink to="/createprofile"> */}
                                            <Button type="primary" className="login-form-button" htmlType="submit">
                                                Sign up
                                          </Button>
                                            {/* </NavLink> */}

                                        </div>
                                    </Form.Item>
                                </Form>

                            </div>
                        </Card>
                    </div>
                    <p className="registertext signintext">Already have an account ?
                                       <NavLink to="/signin">
                            <span className="clickingelement"> Sign in</span>
                        </NavLink>
                    </p>
                </div>
            </div>
        );
    }
}
const WrappedLogin = Form.create({ name: 'horizontal_login' })(SignUpForm);
export default withRouter(WrappedLogin)
// const mapStateToProps = state => {
//     return state;
// };

// function mapDispatchToProps(dispatch, state) {
//     return {
//         actions: bindActionCreators(actioncreators, dispatch)
//     };
// }

// const WrappedLogin = Form.create({ name: 'horizontal_login' })(SignUpForm);

// export default withRouter(
//     connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )(WrappedLogin)
// );