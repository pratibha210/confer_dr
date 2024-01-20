import React, { Component } from 'react';
import './EditProfile.css';
import 'antd/dist/antd.css';
import placeholder from '../../images/placeholder.png';
import { Button, Form, Icon, message } from 'antd';
import calendarclock from '../../images/calendarclock.png';
import leftarrow from '../../images/leftarrow.png'
import rightarrow from '../../images/rightarrow.png'
import { NavLink } from 'react-router-dom';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import personal from '../../images/personal.png';
import contact from '../../images/contact.png';
import address from '../../images/home-address.png';
import openNotificationWithIcon from '../../Common/UiComponent/AlertComponent';
import { Select } from 'antd';

import lockicon from '../../images/Password.png';
import usericon from '../../images/Username.png';


class EditProfileSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      showerror: false
    }
    //console.log(this.props);

  };

  ///////// to show userdetails//////////////////

  componentDidMount() {

    //console.log(this.props);

    if (this.props.userdetails) {
      this.setState({

        bloodgroup: this.props.userdetails.bloodgroup,
        gender: this.props.userdetails.gender
      });

      //console.log(this.props.userdetails);
      this.props.form.setFieldsValue({
        name: this.props.userdetails.name,
        email: this.props.userdetails.email,
        contactno: this.props.userdetails.contactno,
        address: this.props.userdetails.address,
        bloodgroup: this.props.userdetails.bloodgroup,
        gender: this.props.userdetails.gender

      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // //console.log(nextProps.clinicRequest)
    if (!Object.is(nextProps.error, this.props.error)) {
      this.setState({
        errorMessage: nextProps.error,
        showerror: true
      }
      // , () => { //console.log(this.state.errorMessage) })
      )
    }
  }
  ////onchange function for gender////
  onChangeData = (e) => {
    //console.log(e);
    // e.preventDefault();
    if (this.props.userdetails) {
      this.setState({
        gender: e

      }, () => {
        //console.log(this.state.gender, "....");
      })
    }

  }

  //// onchange function for bloodgrp///
  bloodgroupData = (e) => {
    //console.log(e);
    // e.preventDefault();
    if (this.props.userdetails) {
      this.setState({

        bloodgroup: e
      }, () => {
        //console.log(this.state.bloodgroup, "....");
      })
    }

  }

  /////// for API call Function//////////
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {

      if (!err) {
        // if (this.props.userdetails) {
          //console.log(this.props.userdetails, "props");
          //console.log(values, "goes to edit in form");
          values.gender = this.state.gender;
          values.bloodgroup = this.state.bloodgroup;
          
          let formData = new FormData();
          formData.append("token", sessionStorage.getItem("token"));
          formData.append("uid", this.props.userdetails.id);
          formData.append("bloodgrp", values.bloodgroup);
          formData.append("name", values.name);
          formData.append("contactNo", values.contactno);
          formData.append("gender", values.gender);
          formData.append("address", values.address);

          for (var pair of formData.entries()) {
            //console.log(pair[0] + ', ' + pair[1]);
          }
          const config = {
            method: 'POST',
            body: formData,


          }
          fetch(process.env.REACT_APP_apiurl + "/restapi/User/update/", config)
            .then(result =>
              //  //console.log(result))
              result.json())
            .then(result => {
              //console.log(result);
              if (result.success === 1) {
                //console.log(result);
                this.props.history.goBack();
                this.props.actions.userUpdate(result);
                openNotificationWithIcon('success','Profile updated successfully!!');
              
              }
              else {
                openNotificationWithIcon('error','Update Profile Error!!');
              }

            })
            .catch(err => {
              openNotificationWithIcon('error','Internal Server error!!');
            });

        }
       
      else {
        openNotificationWithIcon('error','Something went wrong!!');
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const { TextArea } = Input;

    return (

      <div className="conferdr editprofile">
        <div className="sectionnamePart fordesktopversion">
          <NavLink to="/dashboard">
            <Icon type="left" className="arrow_back hidden-lg" /><span className="titlename">Edit Profile</span>
            {/* <i class="fas fa-ellipsis-h arrow_back ellipsis"></i> */}

          </NavLink>

        </div>


        {/* for destop version start */}
        {/* <div className="fordesktop1"> */}
        <div className="cardsection mycliniccard ">
          <Form onSubmit={this.handleSubmit} className="login-form loginFormNew">
            {this.state.showerror && <p className="error"> {this.props.error}</p>}

            <p className="profiledetailsectiontitle heading">
              <img src={personal} className="persondetailimg" />Personal Details</p>

            <div className="profiledetailsectiontextstart">
              {/* <p className="profilepara"><span className="profileparatitle">User Name : </span><span>dkshukla</span></p>
                            <p className="profilepara"><span className="profileparatitle">Gender : </span><span>Female</span></p>
                            <p className="profilepara"><span className="profileparatitle">Blood Group : </span><span>B+</span></p> */}
              <div className="feildrow">
                <Form.Item label="Username"
                  className="usernamediv"
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input className="inputicon" autocomplete="off" />
                  )}
                </Form.Item>
                <Form.Item label="Gender"
                  className="usernamediv"
                >
                  <Select
                    showSearch
                    style={{ width: 451 }}
                    placeholder="Select your gender"
                    optionFilterProp="children"
                    value={this.state.gender}
                    onChange={this.onChangeData}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="M">Male</Option>
                    <Option value="F">Female</Option>
                    <Option value="O">Other</Option>
                  </Select>
                </Form.Item></div>
              <div className="feildrow">
                <Form.Item label="Blood Group"
                  className="usernamediv"
                >
                  <Select
                    showSearch
                    style={{ width: 451 }}
                    placeholder="Select your blood group"
                    optionFilterProp="children"
                    onChange={this.bloodgroupData}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    value={this.state.bloodgroup}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    className="bloodgrpselect"
                  >
                    <Option value="A+">A+</Option>
                    <Option value="B+">B+</Option>
                    <Option value="AB+">AB+</Option>
                    <Option value="AB-">AB-</Option>
                    <Option value="O+">O+</Option>
                    <Option value="0-">O-</Option>

                  </Select>
                </Form.Item></div>

            </div>
            <p className="profiledetailsectiontitle heading">
              <img src={contact} className="persondetailimg" />Contact Details</p>
            <div className="profiledetailsectiontextstart">
              {/* <p className="profilepara"><span className="profileparatitle">Contact Number : </span><span>123456789</span></p>
              <p className="profilepara"><span className="profileparatitle">Email : </span><span>abc@gmail.com</span></p> */}
              <div className="feildrow">
                <Form.Item label="Contact Number"
                  className="usernamediv"
                >
                  {getFieldDecorator('contactno', {
                    rules: [{ required: true, message: 'Please input your number!' },
                    {
                      len: 10,
                      message: "Phone number should be of ten digits"
                    },]
                  })(
                    <Input className="inputicon" autocomplete="off" />
                  )}
                </Form.Item>
                <Form.Item label="Email"
                  className="usernamediv"
                >
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                  })(
                    <Input className="inputicon" autocomplete="off" />
                  )}
                </Form.Item></div>
            </div>
            <p className="profiledetailsectiontitle heading">
              <img src={address} className="persondetailimg" />Address Details</p>
            <div className="profiledetailsectiontextstart">
              <div className="feildrow">
                <Form.Item label="Address"
                  className="usernamediv"
                >
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: 'Please input your address!' }],
                  })(
                    <TextArea rows={4} className="inputicon" autocomplete="off" />
                  )}
                </Form.Item></div>
            </div>
            <Button type="primary" htmlType="submit" className="editprofile-save-button">
              {"submit"}
            </Button>
          </Form>

        </div>
        {/* </div> */}
        {/* for desktop version end */}
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
const WrappedLogin = Form.create({ name: 'horizontal_login' })(EditProfileSection);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedLogin)
);

