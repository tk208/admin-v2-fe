import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

// 页面
import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import UserList from 'page/user/index.jsx';
import OrderList from 'page/order/index.jsx';
import OrderDetail from 'page/order/detail.jsx';
import ProductRouer from 'page/product/router.jsx';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={ () => (
                        <Layout>  
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/product" component={ProductRouer} />
                                <Route path="/product-category" component={ProductRouer} />
                                <Route path="/order/index" component={OrderList} />
                                <Route path="/order/detail/:orderNumber" component={OrderDetail} />
                                <Route path="/user/index" component={UserList} />
                                <Redirect exact from="/user" to="/user/index"/>
                                <Redirect exact from="/order" to="/order/index"/>
                                <Route component={ErrorPage} />
                            </Switch>
                        </Layout>
                    )} />
                </Switch>
            </Router> 
        )   
    } 
} 



ReactDom.render(
    <App/>,
    document.getElementById('app')
);