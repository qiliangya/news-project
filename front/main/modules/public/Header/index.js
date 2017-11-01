import React from 'react';
import NavLink from '../NavLink/index';
import './index.scss';
class Header extends React.Component{
    render(){
        return (
            // <div className="blog-masthead">
            //     <div className="container">
            //         <nav className="blog-nav col-md-8">
            //             
            //             <NavLink className="blog-nav-item" activeClassName="active" to="/lookNews">随便看看</NavLink>
            //             <NavLink className="blog-nav-item" activeClassName="active" to="/comment">说点什么</NavLink>
            //             <NavLink className="blog-nav-item" activeClassName="active" to="/writeNews">我要爆料</NavLink>
            //             <NavLink className="blog-nav-item" activeClassName="active" to="/register">会员注册</NavLink>
            //         </nav>
            //         <div className="col-md-4">
            //             <NavLink className="login">登录</NavLink>
            //         </div>
            //     </div>
            // </div>

            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <NavLink className="navbar-brand" to="/">千锋新闻网</NavLink>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><NavLink activeClassName="active" to="/">首页</NavLink></li>
                            <li><NavLink activeClassName="active" to="/lookNews">随便看看</NavLink></li>
                            <li><NavLink activeClassName="active" to="/register">会员注册</NavLink></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">猜你喜欢 <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">发起投诉</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li className="dropdown-header">boom</li>
                                    <li><NavLink to="/writeNews">我要爆料</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><NavLink to="/login">我要登录</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

module.exports = Header;