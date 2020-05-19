import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Statistic from 'service/statistic-service.jsx';
const _mm = new MUtil();
const _statistic = new Statistic();

import './index.scss';

export default class PageTitle extends Component {
    constructor(props){
        super(props);
        this.state = {
            userCount : '-',
            productCount : '-',
            orderCount : '-'
        }
    }
    loadCount(){
        _statistic.getHomeCount().then((res)=>{
            this.setState(res);
        },(err)=>{
            _mm.errorTips(err);
        });
    }
    componentWillMount(){
        document.title = this.props.title + '-HAPPYMMALL';
    }
    componentDidMount(){
        this.loadCount();
    }
    render() {
        return (
        <div className="row">
            <Link to="/user" className="col-sm-6 col-lg-4 color-box">
                <div className="card text-white bg-gradient-primary">
                    <div className="card-body card-body d-flex justify-content-between align-items-start">
                        <div>
                            <div style={{fontSize: '5rem'}}>{this.state.userCount}</div>
                            <div><i className="fa fa-user-circle-o"></i>
                            <span className="mx-3">用户总数</span></div>

                        </div>
                    </div>
                </div>
            </Link>

            <Link to="/product" className="col-sm-6 col-lg-4 color-box">
                <div className="card text-white bg-gradient-warning">
                    <div className="card-body card-body d-flex justify-content-between align-items-start">
                        <div>
                            <div style={{fontSize: '5rem'}}>{this.state.productCount}</div>
                            <div> <i className="fa fa-shopping-bag"></i>
                            <span className="mx-3">商品总数</span></div>

                        </div>
                    </div>
                </div>
            </Link>

            <Link to="/order" className="col-sm-6 col-lg-4 color-box">
                <div className="card text-white bg-gradient-danger">
                    <div className="card-body card-body d-flex justify-content-between align-items-start">
                        <div>
                            <div style={{fontSize: '5rem'}}>{this.state.orderCount}</div>
                            <div> <i className="fa fa-list-alt"></i>
                            <span className="mx-3">订单总数</span></div>

                        </div>
                    </div>
                </div>
            </Link>

        </div>
        )
    }
}