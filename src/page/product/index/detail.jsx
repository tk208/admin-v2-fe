import React, { Component } from 'react';
import CategorySelector from './category-selector.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

export default class ProductDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.pid,
            name : '',
            subtitle : '',
            price : '',
            stock : '',
            categoryId : 0,
            detail : '',
            status : 1,
            parentCategoryId : 0,
            subImages : [],
        };
    }
    componentDidMount(){
        this.loadProduct();
    }
    loadProduct(){
        // 有id的时候，表示编辑功能，需要表单回填
        if(this.state.id){
            _product.getProduct(this.state.id).then((res)=>{
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri)=>{
                    return {
                        uri : imgUri,
                        url : res.imageHost + imgUri
                    }
                });
                this.setState(res)
            },(err)=>{
                _mm.errorTips(err);
            })
        }
    }

    render() {
        var linkStyle;
        if (this.state.hover) {
          linkStyle = {textAlign:'center',height:"150px",lineHeight:'150px',fontSize:'50px',background:'rgba(0,0,0,.2)',color:'#aaa',position:'absolute',top:'0',bottom:'0',left:'0',right:'0',cursor:'pointer',display:'block'}
        } else {
          linkStyle = {display:'none',textAlign:'center',height:"150px",lineHeight:'150px',fontSize:'50px',background:'rgba(0,0,0,.2)',color:'#aaa',position:'absolute',top:'0',bottom:'0',left:'0',right:'0',cursor:'pointer'}
        }
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
                                        <div className="card-header">商品详情</div>
                                            <div className="card-body">
                                                <div>
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="prependedInput">商品名称</label>
                                                        <div className="controls">
                                                            <div className="input-prepend input-group">
                                                                <p className="form-control-static">{this.state.name}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedInput">商品描述</label>
                                                        <div className="controls">
                                                            <div className="input-group">
                                                                <p className="form-control-static">{this.state.subtitle}</p>
                                                               
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label">所属分类</label>
                                                        <CategorySelector 
                                                        readOnly
                                                        categoryId={this.state.categoryId}
                                                        parentCategoryId={this.state.parentCategoryId} />
                                                    </div>


                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedPrependedInput">商品价格</label>
                                                        <div className="controls">
                                                            <div className="input-prepend input-group">
                                                                <div className="input-group-prepend"><span style={{fontSize:'1.6rem'}} className="input-group-text">￥</span></div>
                                                                <input
                                                                readOnly
                                                                value={this.state.price}
                                                                style={{fontSize:'1.6rem'}} className="form-control" id="appendedPrependedInput" type="number" />
                                                                <div className="input-group-append"><span style={{fontSize:'1.6rem'}} className="input-group-text">元</span></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="rest">商品库存</label>
                                                        <div className="controls">
                                                            <div className="input-prepend input-group">
                                                                <input 
                                                                readOnly
                                                                value={this.state.stock}

                                                                style={{fontSize:'1.6rem'}} className="form-control" id="rest" type="number" />
                                                                <div className="input-group-append"><span style={{fontSize:'1.6rem'}} className="input-group-text">件</span></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label">商品图片</label>
                                                        <div className="controls">
                                                            {
                                                                this.state.subImages.length 
                                                                ? this.state.subImages.map((image,index) => (
                                                                    <div
                                                    
                                                                    style={{position:'relative',marginRight:'1rem',width:'150px',height:'150px',float:'left'}}>
                                                                    <img 
                                                                     style={{width:'100%',height:'100%'}}
                                                                     src={image.url} 
                                                                      />
                                                             
                                                                    </div>
                                                                )) : <div>暂无图片</div>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div style={{clear:'both'}} className="form-group">
                                                        <label className="col-form-label">商品详情</label>
                                                        <div className="controls">
                                                          {this.state.detail}
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
