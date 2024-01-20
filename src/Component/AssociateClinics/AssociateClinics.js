import React, { Component } from 'react';
import './AssociateClinics.css';
import 'antd/dist/antd.css';
import placeholder from '../../images/placeholder.png';
import { Select, Steps, Button, clinicCard, message, Card, Form, Row, Col, Collapse, Icon } from 'antd';
import calendarclock from '../../images/calendarclock.png';
import leftarrow from '../../images/leftarrow.png'
import rightarrow from '../../images/rightarrow.png'
// import '../ConsultationPage/ConsultationPage.css';
// import '../AppointmentDetails/AppointmentDetails.css';
import { NavLink } from 'react-router-dom';
import timeimg from '../../images/Time.png';
import * as actioncreators from "../../redux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';


// Collapse
const Panel = Collapse.Panel;
// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;
// Collapse
const Option = Select.Option;
const Step = Steps.Step;

function handleChange(value) {
  //console.log(`selected ${value}`);
}

function handleBlur() {
  //console.log('blur');
}

function handleFocus() {
  //console.log('focus');
}

class AssociateClinics extends Component {

  // Steps start
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      cityname: "",
      adddrRequest: "",
      clearMessage: true,
      showerr:false
    }

  };

  handleChangeCityname = x => {
    //console.log(x);
    this.setState({
      Cityname: x
    });
    // if (!this.state.Cityname) {
    //   this.setState({ message: "Please select a city", showerr: true })
    // }
    // else {
      this.props.actions.getclinicname(x)
      // this.props.actions.getcityname()
    // }
  };

  componentDidMount() {
    this.props.actions.getclinicRequest()
   
  }

  redirect = clinicid => {
    
    this.props.actions.adddoctorrequest(this.props.userdetails.id, clinicid)

  };

  componentWillUnmount() {
    //console.log('Component WILL UNMOUNT!')

    this.props.actions.clearMessage()

  }



  componentDidMount() {
    //console.log("in associate clinics")
    // if(this.props.userdetails._id && this.props.actions.resumesession)
    // this.props.actions.getclinicname()
    this.props.actions.getcityname()
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  // steps end
  render() {
    const { current } = this.state;
    const clinicCard = (item) => {
      return (<Card>
        {/* <Card> */}
        <h4 class="clinicname">

          {item.name}
        </h4>
        {/* {this.props.clinicname} */}
        <p class="clinicaddress"><img src={placeholder} />
          {item.cityname}
        </p>
        <div className="rqstbutn">

          <Button onClick={() => this.redirect(item.id)}>
            Send Request  </Button>
          {/* <label> </label> */}
          {/* <p> onClick={this.redirect}</p> */}
        </div>

      </Card>)
    };
    const steps = [{
      title: 'First',
      content:
        <div className="stepcontent">
          <div className="cityclinicdropdown">
            <Select
              className="cityselectoptn"
              showSearch
              placeholder="Select a city"
              optionFilterProp="children"
              onChange={this.handleChangeCityname}
              onFocus={handleFocus}
              onBlur={handleBlur}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >

              {this.props.cityname.map(x => {
                return <Option value={x.cityname}>{x.cityname}</Option>;
              })}


            </Select>
          </div>
        </div>,
    }, {
      title: 'Second',
      content: <div className="stepcontent">
        {this.props.adddrRequest.error == false && <div className="notifctn-sms">

          {/* {this.state.showMessage} */}
          <p>
            <Icon type="check-circle" />{this.props.adddrRequest.message}</p>
        </div>}
        {/* {this.redirect && */}
        {this.props.adddrRequest.error && <div className="notifctn-sms errorsms">

          <p><Icon type="exclamation-circle" />{this.props.adddrRequest.message}</p>
        </div>}
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}> {/* you have to dynamic this column */}
            {this.props.associateClinics.map(x => clinicCard(x))}
            {/* <Collapse accordion className="cardarea">
              <Panel header={clinicCard}>
                <div className="dr_profile">
                  <Row gutter={16}>
                    <Col md={5} xs={6}>
                      <div className="dr_profileimg">
                        {/* <img src={Username} /> */}
            {/* </div>
                    </Col> */}
            {/* <Col md={19} xs={18}>
                      <div className="dr_detals">
                        <p className="dr_name">Dr. Ratnesh Kumar Thakur</p>
                        <p className="dr_designation">
                          Orthopaedic Surgery & Sports Medicine
                     </p>
                        <p className="daytime"><img src={calendarclock} /><span> Mon-Fri  &nbsp; Time (7:00PM - 9:30PM)</span></p>
                        <div className="rqstbutn">
                          <Button>Send Request</Button>
                        </div>
                      </div>
                    </Col> */}
            {/* </Row>
                </div>
              </Panel>
            </Collapse> */}
          </Col>
        </Row>

      </div>,
    },
      // {
      //   title: 'Last',
      //   content: 'LastContent',
      // }
    ]

    return (
      <div className="conferdr">
        <div className="sectionnamePart fordesktopversion">
          {/* <div class="associateclinicstitle">
            <p>Associate Clinics</p>
          </div> */}
          <NavLink to="/dashboard">
            <Icon type="left" className="arrow_back hidden-lg" /><span className="titlename"> Associate Clinics </span>
          </NavLink>
        </div>

        <div className="clinicsteps">
          <Steps current={current}>
            {steps.map(item => <Steps key={item.title} title={item.title} />)}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action stepbutn">
            {
              current < steps.length - 1
              && <Button className="nxtprvbutn" onClick={() => this.next()}>
                {/* Next */}<img src={rightarrow} className="arrowbutn" />
              </Button>
            }
            {/* {
              current === this.steps.length - 1
              && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
            } */}
            {
              current > 0
              && (
                <Button className="nxtprvbutn" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  {/* Previous */}<img src={leftarrow} className="arrowbutn" />
                </Button>
              )
            }
          </div>
        </div>
      </div>
    );
  }


}

// export default AssociateClinics;
const mapStateToProps = state => {
  return state;
};

// function mapDispatchToProps(dispatch, state) {
//   return {
//       actions: bindActionCreators(actioncreators, dispatch)
//   };
// }

// const WrappedAssociateClinics = Form.create({ name: 'horizontal_login' })(AssociateClinics);

// export default withRouter(
//   connect(
//       mapStateToProps,
//       mapDispatchToProps
//   )(WrappedAssociateClinics)
function mapDispatchToProps(dispatch, state) {
  return {
    actions: bindActionCreators(actioncreators, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AssociateClinics)
);

