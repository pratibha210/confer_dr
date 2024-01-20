import React, { Component } from 'react';
import './LeadsPage.css';
import 'antd/dist/antd.css';
import { Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import view from '../../images/eye.svg';
import MaterialTable from 'material-table';
import { Drawer, Form, Col, Row, Input, Select, DatePicker } from 'antd';

import openNotificationWithIcon from '../../Common/UiComponent/AlertComponent';

const { Option } = Select;

class LeadsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      leadsArray: [],
      visible: false,
      clinicArray: [],
      children: [],
      show: false,
      tempLeadData: {}
    }

  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  showviewDrawer = (data) => {
    this.setState({ tempLeadData: data })
    this.setState({
      show: true,
    });
  };
  closeDrawer = () => {
    this.setState({
      show: false,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handleChange = (value) => {
    //console.log(`selected ${value}`);
    this.setState({ clinicArray: value });
  }

  //// to call get leads api /////
  componentDidMount() {
    // console.log(this.props.userdetails.id)
    this.props.actions.getLeads(this.props.userdetails.id);
    this.props.actions.getphysicianclinic()
    this.props.actions.getSpecialization();
    // this.setState({ userId: this.props.userdetails.id })


  }
  ///// to received new data ///////////////////
  componentWillReceiveProps(newProps) {

    if (!Object.is(newProps.leadsList, this.props.leadsList)) {

      this.setState({ leadsArray: newProps.leadsList }, () => {
        //console.log(this.state.leadsArray, "....leadsArray");
      })
    }

    if (!Object.is(newProps.specialization, this.props.specialization)) {

      for (let i = 0; i < this.props.specialization.length; i++) {

        const specilaizationArray = this.state.children

        specilaizationArray.push(<Option key={this.props.specialization[i].name}>{this.props.specialization[i].name}</Option>);

      }
    }

  }
  /////// for API call for add leads Function//////////
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      values.id = this.props.userdetails.id;
      // console.log(values);
      if (!err) {
        let formData = new FormData();
        formData.append("createdby", values.id);
        formData.append("name", values.name);
        formData.append("contactNo", values.contactNo);
        formData.append("remark", values.remark);
        formData.append("specializations", values.specializations);
        formData.append("clinic", values.clinic);
        formData.append("source", values.source);
        formData.append("lstatus", "Open");


        for (var pair of formData.entries()) {
          // console.log(pair[0] + ', ' + pair[1]);
        }
        const config = {
          method: 'POST',
          body: formData,

        }
        fetch(process.env.REACT_APP_apiurl + "/restapi/Leads/addleads/", config)
          .then(result =>

            result.json())
          .then(result => {
            // console.log(result);
            this.onClose();
            if (result.success === 1) {

              this.props.actions.getLeads(this.props.userdetails.id);
              this.props.form.resetFields();
              openNotificationWithIcon('success', 'Leads Added Successfully!!');

            }
            else {
              openNotificationWithIcon('error', 'Leads Addition failed');

            }

          })
          .catch(err => {
            //////console.log(err);
          });


      }
      else {
        //console.log("error", err);
      }
    });
  };



  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="leadtable" >
        <div className="sectionnamePart fordesktopversion ">
          <NavLink to="/dashboard">
            <Icon type="left" className="arrow_back hidden-lg" /><span className="titlename"> Leads </span>
          </NavLink>


          <Button type="primary" htmlType="submit" className="editprofile-button" onClick={this.showDrawer}>
            Add Leads
            </Button>
          <Drawer
            title="Add Leads"
            width={500}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            className="addleadsmain"
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Name">
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Please enter user name' }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Contact Number">
                    {getFieldDecorator('contactNo', {
                      rules: [{ required: true, message: 'Please enter contact number' },
                      {
                        len: 10,
                        message: "Phone number should be of ten digits"
                      },],
                    })(
                      <Input
                        style={{ width: '100%' }}

                      />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {/* <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Category">
                    {getFieldDecorator('category', {
                      rules: [{ required: true, message: 'Please select your category' }],
                    })(
                      <Select >
                        <Option value="xiao">Xiaoxiao Fu</Option>
                        <Option value="mao">Maomao Zhou</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row> */}
              <Row gutter={16}>

                <Col span={24}>
                  <Form.Item label="Category">
                    {getFieldDecorator('specializations', {
                      rules: [{ required: false, message: 'Please choose category' }],
                    })(
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        // defaultValue={["this.props.specialization.name"]}
                        onChange={this.handleChange}
                      >
                        {this.state.children}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Clinic">
                    {getFieldDecorator('clinic', {
                      rules: [{ required: true, message: 'Please choose clinic' }],
                    })(
                      <Select
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>

                        {this.props.clinics.map(x => {
                          return <Option value={x.clinicid}>{x.clinic}</Option>;
                        })}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>

                <Col span={24}>
                  <Form.Item label="Source of the lead">
                    {getFieldDecorator('source', {
                      rules: [{ required: false, message: 'Please enter source of the lead' }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* <Row gutter={16}>

                <Col span={24}>
                  <Form.Item label="Status">
                    {getFieldDecorator('lstatus', {
                      rules: [{ required: false, message: 'Please enter status' }],
                    })
                    (<Input disabled={true}/>)}
                  </Form.Item>
                </Col>
              </Row> */}
              {/* <Row gutter={16}>

                <Col span={24}>
                  <Form.Item label="Created by">
                    {getFieldDecorator('createdby', {
                      rules: [{ required: false, message: 'Please enter created by' }],
                    })(<Input disabled={true} />)}
                  </Form.Item>
                </Col>
              </Row> */}
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Remarks">
                    {getFieldDecorator('remark', {
                      rules: [
                        {
                          required: false,
                          message: 'please enter your remarks',
                        },
                      ],
                    })(<Input.TextArea rows={4} />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
            </Button>
              <Button onClick={this.handleSubmit} type="primary">
                Submit
            </Button>
            </div>
          </Drawer>
        </div>




        <MaterialTable
          title=" "
          columns={[

            { title: 'Name', field: 'name' },
            { title: 'Contact Number', field: 'contactNo' },
            { title: 'Category', field: 'specializations' },
            {
              title: 'Source',
              field: 'source',
            },
            // { title: 'Status', field: 'lstatus' },
            {
              title: 'Action', field: 'action',
              render: rowData => {
                return (


                  <div className="viewaction">

                    <img src={view} style={{ width: 20, cursor: 'pointer' }} onClick={() => this.showviewDrawer(rowData)} />

                  </div>
                )
              }
            },

          ]}

          // actions={[
          //   {
          //     icon: 'delete',
          //     tooltip: 'Save User',
          //     onClick: (event, rowData) => alert("You saved " + rowData.name)
          //   }
          // ]}
          data={this.state.leadsArray}
        //   [
        //   { name: 'Suvakanta', contact: '123456', category: '', source: 'Self', status: 'Open'  },
        // ]}   
        />
        {Object.keys(this.state.tempLeadData).length > 0 &&
          <Drawer
            title="Lead Details"
            width={350}
            onClose={this.closeDrawer}
            visible={this.state.show}
            bodyStyle={{ paddingBottom: 80 }}>
            <p className="profilepara"><span className="profileparatitle">Name : </span><span>{this.state.tempLeadData.name}</span></p>
            <p className="profilepara"><span className="profileparatitle">Contact Number : </span><span>{this.state.tempLeadData.contactNo}</span></p>
            <p className="profilepara"><span className="profileparatitle">Category: </span><span>{this.state.tempLeadData.category}</span></p>
            <p className="profilepara"><span className="profileparatitle">Source : </span><span>{this.state.tempLeadData.source}</span></p>
            <p className="profilepara"><span className="profileparatitle">Status : </span><span>{this.state.tempLeadData.lstatus}</span></p>
            <p className="profilepara"><span className="profileparatitle">Specialization : </span><span>{this.state.tempLeadData.specializations}</span></p>
            <p className="profilepara"><span className="profileparatitle">Clinic: </span><span>{this.state.tempLeadData.clinic}</span></p>
            <p className="profilepara"><span className="profileparatitle">Created by: </span><span>{this.state.tempLeadData.createdby}</span></p>
            <p className="profilepara"><span className="profileparatitle">Remarks : </span><span>{this.state.tempLeadData.remark}</span></p>

          </Drawer>}

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
const WrappedLogin = Form.create({ name: 'horizontal_login' })(LeadsPage);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedLogin)
);

