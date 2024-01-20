import React, { Component } from 'react';
import './Splash.css';
import { Carousel, Steps, Button, message } from 'antd';
import firstslide from '../../images/_01_.png';
import secondscreen from '../../images/_02_.png';
import thridscreen from '../../images/_03_.png';
import fouthscreen from '../../images/_04_.png';
import fifthscreen from '../../images/_05_.png';
import { NavLink } from 'react-router-dom';
// import * as actioncreators from "../../redux/action";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

const Step = Steps.Step;
const steps = [{
     title: 'First',
    content: <div className="firstStepcontent">
        <div className="conferdr-slide">
            <img src={firstslide} />
            <h2>Manage Your Practics with Ease! </h2>
           
        </div>
    </div>,
}, {
     title: 'Second',
    content: <div className="secondStepcontent">
        <div className="conferdr-slide" style={{marginTop: '44px'}}>
            <img src={secondscreen} />
            <h2>Consultation</h2>
            <p className="subpara">Shows Daily,Past and Future Appointments of patient</p>
        </div>
    </div>,
}, {
     title: 'Last',
    content: <div className="thirdStepcontent">
        <div className="conferdr-slide" style={{marginTop: '27px'}}>
            <img src={thridscreen} />
            <h2>E-Prescription</h2>
            <p className="subpara">Make All Pateient's Prescription Online</p>
        </div>
    </div>,
},
{   title:"random",
    content: <div className="fourthStepcontent">
        <div className="conferdr-slide" style={{marginTop: '43px'}}>
            <img src={fouthscreen} />
            <h2 className="singleline">Doctor Clinic Association</h2>
            <p className="subpara">Send Request To Individual Clinics And Get Associated With Them</p>
        </div>
    </div>,
},
{    title:"test",
    content: <div className="fourthStepcontent">
        <div className="conferdr-slide" style={{marginTop: '25px'}}>
            <img src={fifthscreen} />
            <h2>Leads Management</h2>
            <p className="subpara">Provide leads of other Doctors</p>
        </div>
    </div>,
}];
class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        const { current } = this.state;
        return (
            <div className="conferdr splashscreenconferdr">
                {/*------------------ Steps Part start----------------------- */}
                <div className="bottomDrawersteps">
                    <div className="steps-content">
                    {current < steps.length - 1
                            &&
                            <NavLink to="/signin">
                             <Button type="primary" className="skipbtn">Skip</Button>
                             </NavLink>
                        }
                    {steps[current].content}</div>
                    {/* <div style={{display:'inline'}}> */}
                    <Steps progressDot current={current}>
                        {steps.map(item => <Step key={item.title} />)}
                    </Steps>
                    <div className="steps-action">
                        {current > 0
                            && <Button type="primary" onClick={() => this.prev()} style={{ marginLeft: 0, marginRight: '12px' }}>Back</Button>
                        }
                        {
                            current === steps.length - 1
                            && 
                            <NavLink to="/signin">
                            <Button type="primary" style={{float:'right',marginRight:'12px'}}>Continue</Button>
                            </NavLink>
                        }
                        {
                            current < steps.length - 1
                            && (
                                <Button style={{ marginLeft: 0, marginRight: '12px',float:'right' }} onClick={() => this.next()}>
                                    Next
                                 </Button>
                            )
                        }
                    </div>
                    {/* </div> */}

                </div>
                {/*------------------ Steps Part end----------------------- */}

            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return state;
//   };
  
//   function mapDispatchToProps(dispatch, state) {
//     return {
//       actions: bindActionCreators(actioncreators, dispatch)
//     };
//   }
  
//   export default withRouter(
//     connect(
//       mapStateToProps,
//       mapDispatchToProps
//     )(Splash)
//   );
  

export default Splash;
