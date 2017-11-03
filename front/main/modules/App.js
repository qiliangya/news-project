import React from 'react';

import Header from './public/Header/index'
import Footer from './public/Footer/index'
import Search from './public/Search/index'
import Sider from './public/Sider/index'

class App extends React.Component{
    render(){
        return (
            <div>
                <Header/>
                <Search/>
                <div className="container">
                    <div className="row row-offcanvas row-offcanvas-right">
                        <div className="col-xs-12 col-sm-9">
                            {this.props.children}                            
                        </div>
                        <Sider/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

module.exports = App;