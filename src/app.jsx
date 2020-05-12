import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';

// 页面
import Home from 'page/home/index.jsx';

class App extends Component {
    render() {
        return (
            
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/product" component={Home} />
                            <Route path="/product-category" component={Home} />
                        </Switch>
                    </Layout>
                </Router> 
            
        )
    }
} 



ReactDom.render(
    <App/>,
    document.getElementById('app')
);