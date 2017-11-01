import React from 'react';
import NavLink from '../NavLink/index';
import './index.scss';
class Header extends React.Component{
    render(){
        return (
            <div className="blog-masthead">
                <div className="container">
                    <nav className="blog-nav">
                        <NavLink className="blog-nav-item active" to="/">首页</NavLink>
                        <NavLink className="blog-nav-item" to="/lookNews">随便看看</NavLink>
                        <NavLink className="blog-nav-item" to="/comment">说点什么</NavLink>
                        <NavLink className="blog-nav-item" to="/writeNews">我要爆料</NavLink>
                        <NavLink className="blog-nav-item" to="register">会员注册</NavLink>
                    </nav>
                </div>
            </div>
        )
    }
}

module.exports = Header;