import React, { Component } from 'react';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

export default class ProductSave extends Component {
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
            hover: false
        };
        this.toggleHover = this.toggleHover.bind(this);
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
    // 品类选择器变化
    onCategoryChange(categoryId,parentCategoryId){
        this.setState({
            categoryId : categoryId,
            parentCategoryId : parentCategoryId
        })
    }
    // 上传图片成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages : subImages
        })
    }
    // 上传图片失败
    onUploadError(err){
        _mm.errorTips(err);
    }
    // 删除图片
    onImageDelete(e){
        let index = parseInt (e.target.getAttribute('index'));
        let subImages = this.state.subImages;
        subImages.splice(index,1);
        this.setState({
            subImages : subImages
        })
    }
    // 富文本编辑器的变化
    onRichEditorChange(value){
        console.log(value);
        this.setState({
            detail : value
        })
    }

    onValueChange(e){
        let name = e.target.name;
        let value = e.target.value.trim();
        this.setState({
            [name] : value
        })
    }

    getSubImagesString(){
        return this.state.subImages.map((image,index) => (
            image.uri
        )).join(',');
    }

    onSubmit(e){
        let product = {
            name : this.state.name,
            subtitle : this.state.subtitle,
            subImages : this.getSubImagesString(),
            detail : this.state.detail,
            categoryId : parseInt(this.state.categoryId),
            price : parseFloat(this.state.price),
            stock : parseInt(this.state.stock),
            status : this.state.status
        };
        console.log(product);
        let productCheckResult = _product.checkProduct(product);
        console.log(productCheckResult);
        if(productCheckResult.status){
            _product.saveProduct(product).then((res)=>{
                _mm.successTips(res);
                this.props.history.push('/product/index');
            },(err)=>{
                _mm.errorTips(err);
            })
        } else {
            _mm.errorTips(productCheckResult.msg)
        }
    }

    toggleHover(){
        this.setState({hover: !this.state.hover})
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
                                        <div className="card-header">
                                        {
                                            this.state.id ? '编辑商品' : '添加商品'
                                        }
                                      
                                        </div>
                                            <div className="card-body">
                                                <div>
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="prependedInput">商品名称</label>
                                                        <div className="controls">
                                                            <div className="input-prepend input-group">
                                                                <input 
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={(e) => this.onValueChange(e)}
                                                                style={{fontSize:'1.6rem'}} 
                                                                className="form-control" 
                                                                id="prependedInput" type="text" 
                                                                placeholder="请输入商品名称" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedInput">商品描述</label>
                                                        <div className="controls">
                                                            <div className="input-group">
                                                                <input
                                                                name="subtitle"
                                                                value={this.state.subtitle}
                                                                onChange={(e) => this.onValueChange(e)}
                                                                style={{fontSize:'1.6rem'}} className="form-control" id="appendedInput" type="text" placeholder="请输入商品描述" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label">所属分类</label>
                                                        <CategorySelector 
                                                        categoryId={this.state.categoryId}
                                                        parentCategoryId={this.state.parentCategoryId}
                                                        onCategoryChange={(categoryId,parentCategoryId) => {
                                                            this.onCategoryChange(categoryId,parentCategoryId)
                                                        }} />
                                                    </div>


                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="appendedPrependedInput">商品价格</label>
                                                        <div className="controls">
                                                            <div className="input-prepend input-group">
                                                                <div className="input-group-prepend"><span style={{fontSize:'1.6rem'}} className="input-group-text">￥</span></div>
                                                                <input
                                                                name="price"
                                                                value={this.state.price}
                                                                onChange={(e) => this.onValueChange(e)}
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
                                                                name="stock"
                                                                value={this.state.stock}
                                                                onChange={(e) => this.onValueChange(e)}
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
                                                                    onMouseLeave={this.toggleHover}
                                                                    onMouseEnter={this.toggleHover} key={index} 
                                                                    style={{position:'relative',marginRight:'1rem',width:'150px',height:'150px',float:'left'}}>
                                                                    <img 
                                                                     style={{width:'100%',height:'100%'}}
                                                                     src={image.url} 
                                                                      />
                                                                    <i 
                                                                    index={index} 
                                                                    onClick={(e) => this.onImageDelete(e)}                                                                                                                                   
                                                                    style={linkStyle}
                                                                    className="fa fa-times-circle-o" 
                                                                    aria-hidden="true"></i>
                                                                    </div>
                                                                )) : <div>请上传图片</div>
                                                            }
                                                        </div>
                                                        <div className="controls">
                                                            <FileUploader 
                                                            onSuccess={(res)=>{this.onUploadSuccess(res)}} 
                                                            onError={(err)=>{this.onUploadError(err)}} />
                                                        </div>
                                                    </div>

                                                    <div style={{clear:'both'}} className="form-group">
                                                        <label className="col-form-label">商品详情</label>
                                                        <div className="controls">
                                                            <RichEditor
                                                            detail={this.state.detail}
                                                            onValueChange={(value) => this.onRichEditorChange(value)} />
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
