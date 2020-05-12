import React, { Component } from 'react';
import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';


import './theme.css';

export default class Layout extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <SideNav/>
                <div className="c-wrapper">
                <TopNav/>
                {this.props.children}
                </div>
             
            </React.Fragment>
        )
    }
}
