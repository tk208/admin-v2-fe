import React, { Component } from 'react';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';
import './index.scss';

const _mm = new MUtil();
const _user = new User();

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            redirect : _mm.getUrlParam('redirect') || '/'
        }
    }

    componentWillMount(){
        document.title = "登录 -- HAPPY MMALL ADMIN"
    }
    // 处理多个input
    onInputChange(e){ 
        let inputName = e.target.name;
        let inputValue = e.target.value;
        this.setState({
            [inputName] : inputValue
        })
    }
    // 输入回车也完成提交
    onInputKeyUp(e){
        if(e.keyCode === 13) {
            this.onSubmit();
        }
    }
    // onUserNameChange(e){
    //     console.log(e.target.value);
    //     this.setState({
    //         username : e.target.value
    //     })
    // }
    // onPasswordChange(e){
    //     this.setState({
    //         password : e.target.value
    //     })
    // }

    onSubmit(){
        let loginInfo = {
            username : this.state.username,
            password : this.state.password
        };
        let checkResult = _user.checkLoginInfo(loginInfo);
        if(checkResult.status){
            _user.login(loginInfo)
            .then((res) => {
               _mm.setStorage('userInfo',res);
                this.props.history.push(this.state.redirect)
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        } else {
            _mm.errorTips(checkResult.msg)
        }
    }

    render() {
        return (
                <div className="login-panel">
                    <div className="c-main">
                        <div className="container-fluid">
                            <div id="ui-view">
                                <div>
                                    <div className="fade-in">
                                        <div className="card">
                                            <div className="card-header"> 
                                                欢迎登录 -- HAPPY MMALL后台管理系统
                                            </div>
                                            <div className="card-body">
                                                <div className="form-horizontal">
                                                    <div className="form-group">
                                        
                                                        <div className="col-md-12 col-lg-12">
                                                            <input className="form-control" 
                                                            style = {{fontSize:'1.5rem'}}
                                                            id="username" 
                                                            type="text" 
                                                            name="username" 
                                                            onKeyUp={e=>this.onInputKeyUp(e)}
                                                            onChange = {e => this.onInputChange(e)}
                                                            placeholder="输入用户名.."/>
                                                            <span className="help-block">Please enter your name</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                      
                                                        <div className="col-md-12 col-lg-12">
                                                            <input className="form-control" 
                                                            style = {{fontSize:'1.5rem'}}
                                                            id="password" 
                                                            type="password" 
                                                            name="password" 
                                                            onKeyUp={e=>this.onInputKeyUp(e)}
                                                            onChange = {(e)=>{this.onInputChange(e)}}
                                                            placeholder="输入密码.."/>
                                                            <span className="help-block">Please enter your password</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-lg btn-primary btn-block"
                                                style = {{fontSize:'1.5rem'}}
                                                onClick = {e => {this.onSubmit(e)}}
                                                 > 登录</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}