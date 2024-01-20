import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './NoDataFound.css'
import background from '../../images/microscope.png';
import { Button, Card, Form, Icon, Input, Popover } from 'antd';
import { NavLink } from 'react-router-dom';


class NoDataFound extends Component {

    render() {
        return (
            <div className="background">
                <img src={background} className="searchimage" />
                <p className="oops">OOPS!!</p>
                <p className="font">No Data Found</p>
            </div>
        );
    }
}
export default withRouter(NoDataFound)
