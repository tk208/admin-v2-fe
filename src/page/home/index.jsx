import React, { Component } from 'react';
import './index.css';
import PageTitle from '../../component/page-title/index.jsx';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="c-body">
                <main className="c-main">
                    <div className="container-fluid">
                        <div id="ui-view">
                            <div>
                                <div className="fade-in">
                                    <PageTitle title="首页"/>                                                     
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <footer className="c-footer">
                <div><a href="#">HappyMmall</a> © 2020.</div>
                <div className="mfs-auto">Powered by&nbsp;<a href="#">tk208</a></div>
            </footer>
            </React.Fragment>
        );
    }
}