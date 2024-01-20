import React, { Component } from 'react';
import './ChangePassword.css';
import 'antd/dist/antd.css';
import placeholder from '../../images/placeholder.png';
import { Button, Form, Icon } from 'antd';
import calendarclock from '../../images/calendarclock.png';
import leftarrow from '../../images/leftarrow.png'
import rightarrow from '../../images/rightarrow.png'
import { NavLink } from 'react-router-dom';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import lockicon from '../../images/Password.png';
import usericon from '../../images/Username.png';
import openNotificationWithIcon from '../../Common/UiComponent/AlertComponent';

class ChangePasswordPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nonmatchingpassword: false,
      errorMessage:'',
      showerror: false
    }

  };
  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);

          if (values.confirmpassword !== values.password) {
            this.setState({
                nonmatchingpassword: true
            })
        }
        else{
          //console.log('Received values of form: ', values);
          this.setState({
            nonmatchingpassword: false
        })


        let formData = new FormData();

        formData.append("id", this.props.userdetails.id);
        formData.append("password", values.password);
    
        for (var pair of formData.entries()) {
          //////console.log(pair[0] + ', ' + pair[1]);
        }
        const config = {
          method: 'POST',
          body: formData,
    
    
        }
        fetch(process.env.REACT_APP_apiurl + "/restapi/Password/changepassword/", config)
          .then(result =>
            
            result.json())
          .then(result => {
            
            if (result.success === 1) {
              openNotificationWithIcon('success','Password Changed Successfully!!');
             
              this.props.history.replace("/signin");
             
            }
            else {
              openNotificationWithIcon('error','Password Changed Error!!');
             
            }
    
          })
          .catch(err => {
            // openNotificationWithIcon('error','Please check your data connection!!');
          });

       
        }
      }
      else {
        //console.log("errorr");
      }
    });
  }

  componentDidMount() {
    //console.log(this.props.userdetails, "...");
  }

  componentWillReceiveProps(nextProps) {
    // //console.log(nextProps.clinicRequest)
    if (!Object.is(nextProps.error, this.props.error)) {
        this.setState({
            errorMessage: nextProps.error,
            showerror: true
        })
    }
}

  render() {
    const { getFieldDecorator } = this.props.form;


    return (
      <div className="conferdr">
        <div className="sectionnamePart fordesktopversion">

          <NavLink to="/dashboard">
            <Icon type="left" className="arrow_back hidden-lg" /><span className="titlename"> Change Your Password </span>
          </NavLink>
        </div>

        <div className="clinicsteps">
          <Form onSubmit={this.handleSubmit} className="login-form changepw">
          {this.state.showerror && <p className="error"> {this.state.errorMessage}</p>}
            {/* <Form.Item className="paddingbt"
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<img src={lockicon} className="inputicon" />} placeholder="Old Password" type="password" style={{ borderWidth: '1px' }} />
              )}
            </Form.Item> */}
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
              {/* <NavLink to="/#"> */}
              <Button type="primary" htmlType="submit" className="forgotpw-form-button">
                Save
              </Button>
              {/* </NavLink> */}
            </div>

          </Form>
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
const WrappedLogin = Form.create({ name: 'horizontal_login' })(ChangePasswordPage);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedLogin)
);

