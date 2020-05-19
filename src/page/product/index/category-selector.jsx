import React, { Component } from 'react'
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

export default class CategorySelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstCategoryList : [],
            firstCategoryId : 0,
            secondCategoryList : [],
            secondCategoryId : 0
        };
        this.onFirstCategoryChange = this.onFirstCategoryChange.bind(this);
        this.onSecondCategoryChange = this.onSecondCategoryChange.bind(this);
    }

    componentDidMount(){
        this.loadFirstCategory();
    }

    componentWillReceiveProps(nextProps){
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId;
        let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        // 数据没有发生变化，直接不做处理
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        // 假如只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId : nextProps.categoryId,
                secondCategoryId : 0
            });
        }else{
            this.setState({
                firstCategoryId : nextProps.parentCategoryId,
                secondCategoryId : nextProps.categoryId
            },()=>{
                parentCategoryIdChange && this.loadSecondCategory();
            })
        }
    }

    // 加载一级分类
    loadFirstCategory(){
        _product.getCategoryList().then((res) => {
            console.log(res);
            this.setState({
                firstCategoryList : res
            });
        },(err) => {
            _mm.errorTips(err)
        })
    }
    // 加载二级分类
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then((res) => {
            console.log(res);
            this.setState({
                secondCategoryList : res
            });
        },(err) => {
            _mm.errorTips(err)
        })
    }
    // 选择一级品类
    onFirstCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId : newValue,
            secondCategoryId : 0,
            secondCategoryList : []
        },() => {
            // 更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });
    }
    // 选择二级品类
    onSecondCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId : 0
        },() => {
            this.onPropsCategoryChange();
        });
    }
    // 传给父组件选中的结果
    onPropsCategoryChange(){
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        if(this.state.secondCategoryId){
            this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId)
        } else {
            this.props.onCategoryChange(this.state.firstCategoryId,0)
        }
    }

    render() {
        return (
            <div className="controls">
                <div className="input-group">
                    <select
                    readOnly={this.props.readOnly}
                    value={this.state.firstCategoryId}
                    onChange={this.onFirstCategoryChange}
                    style={{fontSize:'1.6rem',marginRight:'1rem'}} className="form-control" >
                        <option value="">请选择一级分类</option>
                        {
                            this.state.firstCategoryList.map((category,index) => (
                                    <option key={index} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                    { this.state.secondCategoryList.length ?
                        (<select
                        readOnly={this.props.readOnly}
                        value={this.state.secondCategoryId}
                        onChange={this.onSecondCategoryChange}
                        style={{fontSize:'1.6rem'}} className="form-control" >
                            <option value="">请选择二级分类</option>
                            {
                                this.state.secondCategoryList.map((category,index) => (
                                        <option key={index} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>) : null
                    }
                </div>
            </div>
        )
    }
}
