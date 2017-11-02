import React from 'react';
import {connect} from 'react-redux';
import {fetchNewsCateList} from '../action/news';

import './index.scss';

class Home extends React.Component{
    componentWillMount(){
        this.props.fetchNewsCateList();
    }
    render(){  
        const {newsCateList} = this.props;
        if(newsCateList.length === 0){
            
        }
        return (
            <div className="container pad-top">
                <div className="row text-center">
                </div>
            </div>
        )
    }
}

const getValue = state=>{
    return {
        newsCateList:state.cate.newsCateList
    }
}

const HomeConText = connect(getValue,{fetchNewsCateList})(Home);
module.exports = HomeConText;