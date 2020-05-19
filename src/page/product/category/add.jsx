import React, { Component } from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

export default class CategoryAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            parentId : 0,
            categoryList : [],
            categoryName : ''
        }
    }

    componentDidMount(){
        this.loadCategoryList();
    }

    loadCategoryList(){
        _product.getCategoryList()
            .then((res)=>{
                this.setState({
                    categoryList : res
                });
            },(err)=>{
                _mm.errorTips(err);
            })
    }

    onValueChange(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name] : value
        })
    }

    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        if(categoryName){
            _product.saveCategory({
                parentId : this.state.parentId,
                categoryName : categoryName
            }).then((res)=>{
                _mm.successTips(res);
                this.props.history.push('/product-category/index')
            },(err)=>{
                _mm.errorTips(err);
            })
        }else{
            _mm.errorTips('请输入品类名称');
        }
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
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-header">品类信息</div>
                                                <div className="card-body">
                                                <div className="form-group">
                                                        <label className="col-form-label" htmlFor="prependedInput">所属品类</label>
                                                        <div className="controls">
                                                            <div className="input-prepend input-group">
                                                              <select
                                                              onChange={(e)=>this.onValueChange(e)}
                                                               name="parentId">
                                                                  <option value="0">根品类/</option>
                                                                  {
                                                                      this.state.categoryList.map((category,index)=>{
                                                                          return <option key={index} value={category.id}>根品类/{category.name}</option>
                                                                      })
                                                                  }
                                                              </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedInput">品类名称</label>
                                                        <div className="controls">
                                                            <div className="input-group">
                                                                <input
                                                                name="categoryName"
                                                                value={this.state.categoryName}
                                                                onChange={(e) => this.onValueChange(e)}
                                                                style={{fontSize:'1.6rem'}} className="form-control" 
                                                                id="appendedInput" type="text" placeholder="请输入品类名称" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-actions">
                                                        <button 
                                                         onClick={(e) => this.onSubmit(e)}
                                                         style={{fontSize:'1.4rem'}} className="btn btn-primary">保存</button>
                                                       
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
