import React, { Component } from 'react';

import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';
import './detail.scss';

const _mm = new MUtil();
const _order = new Order();

export default class OrderDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderNumber : this.props.match.params.orderNumber,
            orderInfo : {}
        };
    }
    componentDidMount(){
        this.loadOrder();
    }
    onSend(){
        if(window.confirm('是否确认该订单已经发货？')){
            _order.sendGoods(this.state.orderNumber)
                .then((res)=>{
                    this.successTips('发货成功');
                    this.loadOrder();
                },(err)=>{
                    _mm.errorTips(err);
                });
        }
    }
    loadOrder(){
        _order.getOrderDetail(this.state.orderNumber).then((res)=>{
            this.setState({
                orderInfo : res
            })
        },(err)=>{
            _mm.errorTips(err);
        })
    }

    render() {
        let receiverInfo = this.state.orderInfo.shippingVo || {};
        let orderItem = this.state.orderInfo.orderItemVoList || [];
        let listBody = orderItem.map((product,index) => (
            <tr key={index}>
                <td>
                    <img className="p-img" src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt={product.productName} />
                </td>
                <td>{product.productName}</td>
                <td>￥{product.currentUnitPrice}</td>
                <td>{product.quantity}</td>
                <td>{product.totalPrice}</td>
            </tr>
            ));
        return (
            <React.Fragment>
            <div className="c-body">
                <main className="c-main">
                    <div className="container-fluid">
                        <div id="ui-view">
                            <div>
                                <div className="fade-in">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                        <div className="card-header">订单详情</div>
                                            <div className="card-body">
                                                <div>
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="prependedInput">订单号</label>
                                                        <div className="controls">
                                                            <div className="input-prepend input-group">
                                                                <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedInput">创建时间</label>
                                                        <div className="controls">
                                                            <div className="input-group">
                                                                <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedInput">收件人</label>
                                                        <div className="controls">
                                                            <div className="input-group">
                                                                <p className="form-control-static">
                                                                {receiverInfo.receiverName}，
                                                                {receiverInfo.receiverProvince}，
                                                                {receiverInfo.receiverCity}，
                                                                {receiverInfo.receiverAddress}，
                                                                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedInput">订单状态</label>
                                                        <div className="controls">
                                                            <div className="input-group">
                                                                <p className="form-control-static">
                                                                    {this.state.orderInfo.statusDesc}
                                                                    {
                                                                        this.state.orderInfo.status == 20
                                                                        ? <button onClick={(e)=>this.onSend(e)} className="btn btn-primary btn-lg">立即发货</button> : null
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedInput">支付方式</label>
                                                        <div className="controls">
                                                            <div className="input-group">
                                                                <p className="form-control-static">
                                                                    {this.state.orderInfo.paymentTypeDesc}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedInput">订单金额</label>
                                                        <div className="controls">
                                                            <div className="input-group">
                                                                <p className="form-control-static">
                                                                    ￥{this.state.orderInfo.payment}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedInput">商品列表</label>
                                                        <div className="controls">
                                                            <div className="input-group">
                                                              
                                                                <table className="table table-responsive-sm table-bordered table-striped table-sm">
                                                                    <thead>
                                                                        <tr>
                                                                        <th>商品图片</th> 
                                                                        <th>商品信息</th>
                                                                        <th>单价</th>   
                                                                        <th>数量</th>
                                                                        <th>合计</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {listBody}
                                                                    </tbody>
                                                                </table>
                                                
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
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
