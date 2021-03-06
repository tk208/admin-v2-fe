import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

export default class TopNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            username : _mm.getStorage('userInfo').username || ''
        };
        this.dropdown = this.dropdown.bind(this);
        this.hideSide = this.hideSide.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }
    // 点击出现下拉菜单
    dropdown(){
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    // 点击隐藏左侧导航
    hideSide(){
        this.props.clickHideButton()
    }
    // 退出登录
    onLogout(){
        _user.logout().then((res)=>{
            _mm.removeStorage('userInfo');
            window.location.href = '/login';
        },(errMsg)=>{
            _mm.errorTips(errMsg);
        })
    }
    render() {
        return (
            <header className="c-header c-header-light c-header-fixed">
                <button className="c-header-toggler c-class-toggler mfs-3 d-md-down-none" type="button" onClick={this.hideSide}
                    data-class="c-sidebar-lg-show" responsive="true">
                    <i className="fa fa-bars fa-1x" aria-hidden="true"></i>
                </button>
                <ul className="c-header-nav d-md-down-none">
                    <li className="c-header-nav-item px-3"><a className="c-header-nav-link" href="#">Dashboard</a></li>
                    <li className="c-header-nav-item px-3"><a className="c-header-nav-link" href="#">Users</a></li>
                    <li className="c-header-nav-item px-3"><a className="c-header-nav-link" href="#">Settings</a></li>
                </ul>
                <ul className="c-header-nav mfs-auto">
                    <li className="c-header-nav-item px-3 c-d-legacy-none">
                        <button className="c-class-toggler c-header-nav-btn" type="button" id="header-tooltip" data-target="body"
                            data-class="c-dark-theme" data-toggle="c-tooltip" data-placement="bottom" title=""
                            data-original-title="Toggle Light/Dark Mode">
        
                        </button>
                    </li>
                </ul>
                <ul className="c-header-nav">
                    {/* <li className="c-header-nav-item dropdown d-md-down-none mx-3">
                        <a className="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-bell-o" aria-hidden="true"></i>
                        <span className="badge badge-pill badge-danger">5</span>
                        </a>
                    </li>
                    <li className="c-header-nav-item dropdown d-md-down-none mx-3">
                        <a className="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-list-ul" aria-hidden="true"></i>
                        <span className="badge badge-pill badge-warning">15</span>
                        </a>
                    </li>
                    <li className="c-header-nav-item dropdown d-md-down-none mx-3">
                        <a className="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        <span className="badge badge-pill badge-info">7</span>
                        </a>
                    </li> */}
                    
                    <li className="c-header-nav-item dropdown mx-3">
                        <span className="c-header-nav-link" data-toggle="dropdown" onClick={this.dropdown}
                                role="button">
                                <div className="c-avatar">
                                    <i className="fa fa-user-o mx-1" aria-hidden="true"></i>
                                    <i className="fa fa-caret-down mx-1" aria-hidden="true"></i>                        
                                </div>
                                <b className="c-header-nav-link">{this.state.username}</b>
                        </span>
                        <div className={this.state.isOpen? 'dropdown-menu dropdown-menu-right pt-0 show' : 'dropdown-menu dropdown-menu-right pt-0'}>

                            <span className="dropdown-item" style={{fontSize:'1.5rem'}}>
                                <i className="fa fa-user-o mx-5" aria-hidden="true"></i>Profile
                            </span>

                            <span className="dropdown-item" style={{fontSize:'1.5rem'}}>
                            <i className="fa fa-cog mx-5" aria-hidden="true"></i>Settings</span>

                            <span className="dropdown-item" style={{fontSize:'1.5rem'}} onClick={this.onLogout}>
                            <i className="fa fa-sign-out mx-5" aria-hidden="true"></i>退出登录</span>
                        </div>
                    </li>
                </ul>
            </header>
        )
    }
}