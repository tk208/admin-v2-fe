import React, { Component } from 'react'

export default class ListSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderNumber : ''
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSearchKeywordKeyUp = this.onSearchKeywordKeyUp.bind(this);
    }

    onValueChange(e){
        let name = e.target.name;
        let value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    // 输入关键字后回车
    onSearchKeywordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch()
        }
    }
    // 点击搜索按钮
    onSearch(){
        this.props.onSearch(this.state.orderNumber)
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12">
                                <div className="input-group">
                                    <span className="input-group-prepend">
                                    <select
                                    style={{fontSize:'1.3rem'}} 
                                    className="form-control" >
                                        <option>按订单ID查询</option>
                                    </select>
                                    </span>
                                    <input 
                                    onKeyUp={this.onSearchKeywordKeyUp}
                                    onChange={this.onValueChange}
                                    name="orderNumber"
                                    style={{fontSize:'1.3rem'}} 
                                    className="form-control" type="text" 
                                    placeholder="请输入订单号"/>
                                    <span className="input-group-prepend">
                                        <button
                                        onClick={this.onSearch}
                                        style={{fontSize:'1.3rem'}} className="btn btn-primary" type="button">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                        <span className="mx-3">搜索</span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
