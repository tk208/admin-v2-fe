import React, { Component } from 'react';
import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';


import './theme.css';

export default class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            isHide : false
        };
        this.clickHideButton = this.clickHideButton.bind(this);
    }
    clickHideButton(){
        this.setState({
            isHide : !this.state.isHide
        })
    }
    render() {
        return (
            <React.Fragment>
                <SideNav isHide={this.state.isHide}/>
                <div className="c-wrapper">
                <TopNav clickHideButton={this.clickHideButton}/>
                {this.props.children}
                </div>
             
            </React.Fragment>
        )
    }
}
