import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class SideNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShoppingDrop : false,
            isListDrop : false,
            isUserDrop : false
        };
        this.shoppingDropDown = this.shoppingDropDown.bind(this);
        this.listDropDown = this.listDropDown.bind(this);
        this.userDropDown = this.userDropDown.bind(this);
    }
    // 点击打开下拉菜单
    shoppingDropDown(){
        this.setState({
            isShoppingDrop : !this.state.isShoppingDrop
        })
    }
    listDropDown(){
        this.setState({
            isListDrop : !this.state.isListDrop
        })
    }
    userDropDown(){
        this.setState({
            isUserDrop : !this.state.isUserDrop
        })
    }
    render() {
        return (
            <div className={ this.props.isHide ? "c-sidebar c-sidebar-dark c-sidebar-fixed" : "c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show c-sidebar-show"} id="sidebar">    
            <div className="c-sidebar-brand d-md-down-none">
                <Link to="/"><b style={{fontSize:'2rem',color:'#181924'}}>HAPPY MMALL</b></Link>
            </div>
            <ul className="c-sidebar-nav ps ps--active-y">
                {/* <li className="c-sidebar-nav-item"><a className="c-sidebar-nav-link c-active" to="main.html">
                    Dashboard<span className="badge badge-info">NEW</span></a></li> */}

                <li className="c-sidebar-nav-item">
                    <NavLink exact className="c-sidebar-nav-link" activeClassName="c-active" to="/">
                    <i className="fa fa-tachometer mx-5"></i>
                        首页
                    </NavLink>
                </li>

                <li className={ this.state.isShoppingDrop? "c-sidebar-nav-dropdown c-show" : "c-sidebar-nav-dropdown"}>
                    <Link className="c-sidebar-nav-dropdown-toggle" to="/product" onClick={this.shoppingDropDown}>
                    <i className="fa fa-shopping-bag mx-5"></i>
                        商品
                    </Link>
                    <ul className="c-sidebar-nav-dropdown-items">
                        <li className="c-sidebar-nav-item">
                            <NavLink className="c-sidebar-nav-link" activeClassName="c-active" to="/product">
                             商品管理
                            </NavLink>
                        </li>
                        <li className="c-sidebar-nav-item">
                            <NavLink className="c-sidebar-nav-link" activeClassName="c-active" to="/product-category">
                             品类管理
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className={ this.state.isListDrop? "c-sidebar-nav-dropdown c-show" : "c-sidebar-nav-dropdown"}>
                    <Link className="c-sidebar-nav-dropdown-toggle" to="/order" onClick={this.listDropDown}>
                    <i className="fa fa-list-alt mx-5"></i>
                        订单
                    </Link>
                    <ul className="c-sidebar-nav-dropdown-items">
                        <li className="c-sidebar-nav-item">
                            <NavLink className="c-sidebar-nav-link" activeClassName="c-active" to="/order">
                             订单管理
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className={ this.state.isUserDrop? "c-sidebar-nav-dropdown c-show" : "c-sidebar-nav-dropdown"}>
                    <Link className="c-sidebar-nav-dropdown-toggle" to="/user" onClick={this.userDropDown}>
                    <i className="fa fa-user-circle-o mx-5"></i>
                        用户
                    </Link>
                    <ul className="c-sidebar-nav-dropdown-items">
                        <li className="c-sidebar-nav-item">
                            <NavLink className="c-sidebar-nav-link" activeClassName="c-active" to="/user">
                             用户管理
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
            <button className="c-sidebar-minimizer c-class-toggler" type="button"></button>
        </div>
        )
    }
}