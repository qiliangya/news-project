import React from 'react';

import Header from './public/Header/index'
import Footer from './public/Footer/index'
import Search from './public/Search/index'

class App extends React.Component{
    render(){
        return (
            <div>
                <Header/>
                <Search/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

module.exports = App;