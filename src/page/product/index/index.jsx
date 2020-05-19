import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import ListSearch from './index-list-search.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

export default class ProductList extends Component {

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
        this.loadProductList();
    }

    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.searchKeyword = this.state.searchKeyword;
        }
        _product.getProductList(listParam)
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
        },() => this.loadProductList())
    }

    onSetProductStates(e,productId,currentState){
        let newState = currentState == 1 ? 2 : 1;
        let confirmTips = currentState == 1 
            ? "确定要下架该商品？" 
            : "确定要上架该商品？";
            console.log(newState)
        if(window.confirm(confirmTips)){
            _product.setProductStates({
                productId : productId,
                status : newState
            }).then((res) => {
                _mm.successTips(res);
                this.loadProductList();
            },(err) => {
                _mm.errorTips(err);
            })
        }
    }

    onSearch(searchType,searchKeyword){
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType : listType,
            pageNum : 1,
            searchType : searchType,
            searchKeyword : searchKeyword
        },() => {
            this.loadProductList();
        })
    }

    render() {
        let listBody = this.state.list.map((product,index) => {
                return (
                <tr key={index}>
                    <td>{product.id}</td>
                    <td><span className="badge badge-warning">{product.name}</span><br/>{product.subtitle}</td>
                    <td>￥{product.price}</td>
                    <td>
                        {
                            product.status == 1 
                            ?  <span className="badge badge-success">在售</span> 
                            : <span className="badge badge-danger">已下架</span>
                        }
                    <br/>
                        {
                        product.status == 1 
                        ?  <button onClick={(e) => this.onSetProductStates(e,product.id,product.status)}  className="badge badge-danger">下架</button> 
                        : <button onClick={(e) => this.onSetProductStates(e,product.id,product.status)}  className="badge badge-success">上架</button>
                        }
                    </td>
                    <td>
                        <Link to={`/product/detail/${product.id}`}>详情</Link><br/> 
                        <Link className="btn btn-primary" to={`/product/save/${product.id}`}>编辑</Link>
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
                                                商品信息
                                                <Link to='/product/save'
                                                style={{fontSize:'1.2rem'}} 
                                                className="btn btn-pill btn-primary m-4" 
                                                type="button">添加商品</Link>
                                                </div>
                                                <div className="card-body">
                                                    <table className="table table-responsive-sm table-bordered table-striped table-sm">
                                                        <thead>
                                                            <tr>
                                                            <th>商品ID</th>
                                                            <th>商品信息</th>
                                                            <th>价格</th>
                                                            <th>状态</th>
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
