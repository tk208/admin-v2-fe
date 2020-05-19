import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import ListSearch from './index-list-search.jsx';

import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';

const _mm = new MUtil();
const _order = new Order();

export default class OrderList extends Component {

    constructor(props){
        super(props);
        this.state = {
            pageNum : 1,
            list : [],
            firstLoading : true,
            listType : 'list'
        };
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount(){
        this.loadOrderList();
    }

    loadOrderList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        if(this.state.listType === 'search'){
            listParam.orderNo = this.state.orderNumber;
        }
        _order.getOrderList(listParam)
            .then((res)=>{
                this.setState(res,()=>{
                    this.setState({
                        firstLoading : false
                    })
                });
            },(err)=>{
                this.setState({
                    list : []
                })
                _mm.errorTips(err);
            })
    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        },() => this.loadOrderList())
    }

    onSearch(orderNumber){
        let listType = orderNumber === '' ? 'list' : 'search';
        this.setState({
            listType : listType,
            pageNum : 1,
            orderNumber : orderNumber
        },() => {
            this.loadOrderList();
        })
    }

    render() {
        let listBody = this.state.list.map((Order,index) => {
                return (
                <tr key={index}>
                    <td>
                    <Link to={`/order/detail/${Order.orderNo}`}>{Order.orderNo}</Link>
                    </td>
                    <td>{Order.receiverName}</td>
                    <td>{Order.statusDesc}</td>
                    <td>￥{Order.payment}</td>
                    <td>{Order.createTime}</td>
                    <td>
                        <Link to={`/order/detail/${Order.orderNo}`}>详情</Link>
                    </td>
                </tr>
                );
        });

        let listError = (
            <tr>
                <td colSpan='5'>{this.state.firstLoading ? "正在加载数据" : "没有找到相应的结果"}</td>
            </tr>
        );

        let tableBody = this.state.list.length > 0 ? listBody : listError;
        
        return (    
            <React.Fragment>
                <div className="c-body">
                    <main className="c-main">
                        <div className="container-fluid">
                            <div id="ui-view">
                                <div>
                                    <div className="fade-in">
                                    <ListSearch onSearch={this.onSearch} />
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-header">
                                                订单列表
                                                </div>
                                                <div className="card-body">
                                                    <table className="table table-responsive-sm table-bordered table-striped table-sm">
                                                        <thead>
                                                            <tr>
                                                            <th>订单号</th> 
                                                            <th>收件人</th>
                                                            <th>订单状态</th>   
                                                            <th>订单总价</th>
                                                            <th>创建时间</th>
                                                            <th>操作</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tableBody}
                                                        </tbody>
                                                    </table>
                 
                                                    <Pagination 
                                                    showSizeChanger
                                                    showPrevNextJumpers
                                                    current={this.state.pageNum} 
                                                    total={this.state.total} 
                                                    showQuickJumper
                                                    hideOnSinglePage
                                                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>

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
