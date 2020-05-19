import React, { Component } from 'react'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

export default class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageNum : 1,
            list : [],
            firstLoading : true
        }
    }

    componentDidMount(){
        this.loadUserList();
    }

    loadUserList(){
        _user.getUserList(this.state.pageNum)
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
        },() => this.loadUserList())
    }

    render() {
        let listBody = this.state.list.map((user,index) => {
                return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td><span className="badge badge-success">{user.username}</span></td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
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
                                                <div className="card-header">用户信息</div>
                                                <div className="card-body">
                                                    <table className="table table-responsive-sm table-bordered table-striped table-sm">
                                                        <thead>
                                                            <tr>
                                                            <th>ID</th>
                                                            <th>用户名</th>
                                                            <th>邮箱</th>
                                                            <th>电话</th>
                                                            <th>注册时间</th>
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
