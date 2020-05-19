import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

export default class CategoryList extends Component {
    constructor(props){
        super(props);
        this.state = {
            parentCategoryId : this.props.match.params.categoryId || 0,
            list : [],
            firstLoading : true
        }
    }

    componentDidMount(){
        this.loadCategoryList();
    }

    componentDidUpdate(prevProps,prevState){
        let oldPath = prevProps.location.pathname;
        let newPath = this.props.location.pathname;
        let newId = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            },()=>{
                this.loadCategoryList();
            })
        }
        
    }

    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId)
            .then((res)=>{
                this.setState({
                    list : res
                },()=>{
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

    onUpdateName(categoryId,categoryName){
        let newName = window.prompt('请输入新的品类名称',categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId : categoryId,
                categoryName : newName
            }).then((res)=>{
                _mm.successTips(res);
                this.loadCategoryList();
            },(err)=>{
                _mm.errorTips(err);
            })
        }
    }

    render() {
        let listBody = this.state.list.map((category,index) => {
                return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a onClick={(e)=>this.onUpdateName(category.id,category.name)} className="opear">修改名称</a><br/>
                        {
                            category.parentId === 0 ? 
                            <Link to={`/product-category/index/${category.id}`}>查看子品类</Link> : null
                        }
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
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-header">品类信息                                                
                                                <Link to='/product-category/add'
                                                style={{fontSize:'1.2rem'}} 
                                                className="btn btn-pill btn-primary m-4" 
                                                type="button">添加品类</Link></div>

                                                <span className="card-body">父品类ID：{this.state.parentCategoryId}</span>
                                                <div className="card-body">
                                                    <table className="table table-responsive-sm table-bordered table-striped table-sm">
                                                        <thead>
                                                            <tr>
                                                            <th>品类ID</th>
                                                            <th>品类名称</th>
                                                            <th>操作</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tableBody}
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
