import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorPage extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <React.Fragment>
            <div className="c-body">
                <main className="c-main">
                    <div className="container-fluid">
                        <div id="ui-view">
                            <div>
                                <div className="fade-in">
                                   <div className="row">
                                   <div className="col-sm-12 col-xl-6">
                                        <div className="card">
                                            <div className="card-header">
                                             出错了！
                                            </div>
                                            <div className="card-body">
                                                    <Link className="btn btn-primary" style={{fontSize:'1.2rem'}} to="/">
                                                    返回首页
                                                    </Link>
                                            </div>
                                        </div>
                                    </div>
                                   </div>                                                 
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
        )
    }
}
