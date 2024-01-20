import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../SignIn/SignInForm.css';
import './CreateProfileForm.css'
import emailicon from '../../images/Email.png';
import lockicon from '../../images/Password.png';
import privacyicon from '../../images/Privacy.png';
import { Button, Card, Form, Icon, Input, Select } from 'antd';

import { NavLink } from 'react-router-dom';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import City from '../../images/City.png';
import Address from '../../images/Address.png';
import licence_id_v3 from '../../images/licence_id_v3.png';
import Remark from '../../images/Remark.png';
import Education from '../../images/Education.png';
import Gender from '../../images/Gender.png';
import Specialization from '../../images/Specialization.png';
import Experience from '../../images/Experience.png';

// import { withRouter } from "react-router-dom";

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
class CreateProfileForm extends Component {
    constructor() {
        super();
        this.state = {
            gender: "",
            specialization: "",
            experience: "",
            education: "",
            state: "",
            showcity: false,
            city: ""
        }
    };

    handleChangeGender = value => {
        //console.log(value);
        this.setState({ Gender: value });
    };
    handleChangeSpecialization = y => {
        //console.log(y);
        this.setState({
            Specialization: y
        });
    };

    //  handleChangeState = value => {
    //         //console.log(value);
    //         this.setState({ State: value,showcity: true });
    //     };
    handleChangeState = x => {
        //console.log(x);
        this.setState({
            // State: x,
            showcity: true
        });
        this.props.actions.getcitybystate(x)
    };
    handleChangeExperience = value => {
        //console.log(value);
        this.setState({ Experience: value });
    };

    handleChangeCity = q => {
        //console.log(q);
        this.setState({
            city: q
        });
    };

    handleChangeEducation = p => {
        //console.log(p);
        this.setState({
            education: p
        });
    };

    componentDidMount() {
        // //console.log(this.props.selectspecialization._id)
        if (this.props.location && this.props.location.from === "signup") {
            //console.log(this.props.location, "here")
            //console.log(this.props.location.data)
            this.props.actions.getSpecialization()
            this.props.actions.getstates()
            this.props.actions.geteducation()
            // this.props.actions.getcitybystate(this.props.id)

        }
        else {
            this.props.history.push("/signup")
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        // const data = new FormData(e.target);
        this.props.form.validateFields((err, values) => {
            if (!err) {

                //console.log("Received values of form: ", values);
                // values.city=this.state.city,
                this.props.actions.createuser(this.props.location.data, values, this.props.history, this.state.city)

            }
        })

    }

    ///// to received new data ///////////////////
    componentWillReceiveProps(newProps) {

        //console.log(newProps);

        if (!Object.is(newProps.error, this.props.error)) {
            //console.log(newProps.error)

        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // const { TextArea } = Input;
        const Option = Select.Option;
        return (
            <div className="conferdr">
                <div className="loginpage profilecreate">
                    <div className="bgColor">
                        <NavLink to="/signup">
                            <Icon type="left" className="left_arrow" />
                        </NavLink>
                        {/* <i class="fas fa-times close_btn"></i> */}
                    </div>
                    <div className="loginpg">
                        <p className="signinheader">Create Profile</p>
                        <Card className="logincard" bordered={false}>
                            <div className="loginfirst">
                                <Form onSubmit={this.handleSubmit} className="login-form loginFormNew">
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('gender', {
                                            rules: [{ required: true, message: 'Please select your gender!' }],
                                        })(
                                            <Select
                                                // showSearch
                                                // style={{ width: 200 }}
                                                className="createprofileslectfield genderfield"
                                                placeholder="Choose Gender"
                                                optionFilterProp="children"
                                                onChange={this.handleChangeGender}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="M">Male</Option>
                                                <Option value="F">Female</Option>
                                                <Option value="O">Others</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('specialization', {
                                            rules: [{ required: true, message: 'Please select your specialization!' }],
                                        })(
                                            <Select

                                                // showSearch
                                                // style={{ width: 200 }}
                                                className="createprofileslectfield spcliztionfield"
                                                placeholder="Please Select Your Specialization"
                                                optionFilterProp="children"
                                                onChange={this.handleChangeSpecialization}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {/* <div className="Specialization">{rowData.name}</div> */}

                                                {this.props.specialization.map(y => {
                                                    return <Option value={y.name}>{y.name}</Option>;
                                                })}
                                                {/* <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="tom">Tom</Option> */}
                                            </Select>
                                        )}
                                    </Form.Item>
                                    {/* <Form.Item 
                                     className="paddingbt experiencefield" label="Please Text Your Experience"
                                    >
                                        {getFieldDecorator("experience", {
                                            rules: [{ required: true, message: 'Please select your experience years!' }],
                                        })(
                                            <Select
                                                // showSearch
                                                // style={{ width: 200 }}
                                                className="createprofileslectfield"
                                                placeholder="Years of Experience"
                                                optionFilterProp="children"
                                                onChange={handleChange}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="jack">0-1yr</Option>
                                                <Option value="lucy">2-5yrs</Option>
                                                <Option value="tom">5-9yrs</Option>
                                            </Select>


                                            (<Input prefix={<img src={Experience} className="inputicon" />}  placeholder="Username" autocomplete="off" />)
                                        )}
                                    </Form.Item> */}
                                    <Form.Item
                                        className="paddingbt experiencefield"
                                    >
                                        {getFieldDecorator('experience', {
                                            rules: [{ required: true, message: 'Please select your experience!' }],
                                        })(
                                            <Input prefix={<img src={Experience} className="inputicon exprncicn" />} placeholder="Username" autocomplete="off" />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('education', {
                                            rules: [{ required: true, message: 'Please select your education!' }],
                                        })(
                                            <Select
                                                // showSearch
                                                // style={{ width: 200 }}
                                                className="createprofileslectfield eductnfield"
                                                placeholder="Please Select Your Education"
                                                optionFilterProp="children"
                                                onChange={this.handleChangeEducation}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {this.props.education && this.props.education.map(p => {
                                                    return <Option value={p.name}>{p.name}</Option>;
                                                })}
                                                {/* <Option value="jack">Jack</Option> */}
                                                {/* <Option value="lucy">Lucy</Option>
                                                <Option value="tom">Tom</Option>  */}
                                            </Select>
                                        )}
                                    </Form.Item>

                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('state', {
                                            rules: [{ required: true, message: 'Please select your state!' }],
                                        })(
                                            <Select
                                                // showSearch
                                                // style={{ width: 200 }}
                                                className="createprofileslectfield statefield"
                                                placeholder="Please Select Your State"
                                                optionFilterProp="children"
                                                onChange={this.handleChangeState}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >

                                                {this.props.state.map(x => {
                                                    return <Option value={x.id}>{x.name}</Option>;
                                                })}
                                                {/* <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="tom">Tom</Option> */}
                                            </Select>
                                        )}


                                    </Form.Item>

                                    {this.props.error && <p className="error"> {this.props.error}</p>}
                                    {this.state.showcity === true &&
                                        <Form.Item className="paddingbt">
                                            <Select
                                                // showSearch
                                                // style={{ width: 200 }}
                                                placeholder="Select a city"
                                                optionFilterProp="children"
                                                onChange={this.handleChangeCity}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {this.props.cityList.length > 0 &&
                                                    this.props.cityList.map(q => {
                                                        return <Option value={q.name}>{q.name}</Option>;
                                                    })}

                                                {/* <Option value="Kolkata">Kolkata</Option>
                                            <Option value="Delhi">Delhi</Option>
                                            <Option value="Mumbai">Mumbai</Option> */}
                                            </Select>
                                        </Form.Item>
                                    }


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
                                            rules: [{ required: false, message: 'Please input your licenceid' }],
                                        })(
                                            <Input prefix={<img src={licence_id_v3} className="inputicon licenceicn" />} placeholder="Licenceid" autocomplete="off" />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('remark', {
                                            rules: [{ required: false, message: 'Please input your remark' }],
                                        })(
                                            <Input prefix={<img src={Remark} className="inputicon" />} placeholder="Remark" autocomplete="off" />
                                        )}
                                    </Form.Item>


                                    {/* <Form.Item
                                        className="paddingbt"
                                    >
                                        {getFieldDecorator('state', {
                                            rules: [{ required: true, message: 'Please select your state first!' }],
                                        })(
                                            <Select
                                                // showSearch
                                                // style={{ width: 200 }}
                                                className="createprofileslectfield"
                                                placeholder="Please Select Your State first"
                                                optionFilterProp="children"
                                                onChange={handleChange}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="tom">Tom</Option>
                                            </Select>
                                        )}
                                    </Form.Item> */}
                                    {/* <p className="forgotpaswrdtext">Forgot Password ? </p> */}
                                    {/* <div className="textcenter">
                            <p className="continuetext">or continue with</p>
                            </div> */}
                                    {/* <p className="textcenter frgetpwd">Forgot Password ?<div onClick={() => { this.forgotpassword() }} className="forgot">  <span>Click here</span></div></p> */}

                                    <Form.Item className="paddingbt">
                                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: '0' }}>
                                            Create
                            </Button>
                                        {/* </NavLink> */}
                                    </Form.Item>

                                </Form>
                                {/* <div className="textcenter">
                                    <NavLink to="/splash">
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Sign in
                                       </Button>
                                    </NavLink>
                                    <p className="privacytext"><img src={privacyicon} className="privacyicon" /><span className="underline">All T&C and Privacy</span></p>
                                </div> */}
                            </div>
                            {/* <NavLink to="/dashboard"> */}

                        </Card>

                    </div>
                    {/* <p className="registertext">Don't have an account ? <span className="clickingelement">Sign up</span></p> */}
                </div>
            </div>
        );
    }
}
// const WrappedCreateProfile = Form.create({ name: 'horizontal_login' })(CreateProfileForm);
// export default withRouter(WrappedCreateProfile)
const mapStateToProps = state => {
    return state;
};

function mapDispatchToProps(dispatch, state) {
    return {
        actions: bindActionCreators(actioncreators, dispatch)
    };
}

const WrappedCreateProfile = Form.create({ name: 'horizontal_login' })(CreateProfileForm);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(WrappedCreateProfile)
);


