import React from 'react';
import {connect} from 'react-redux';
import {fetchGetAllNewsList} from '../action/news';
import {hashHistory} from 'react-router';

import _ from 'lodash';

class Detail extends React.Component{
    constructor(){
        super();
        this.newsData = '';
    }
    componentWillMount(){
        const {allNewsList,params} = this.props;
        const parId = params.id;
        const data = allNewsList;
        if(allNewsList.length === 0){
            hashHistory.push('/')
        }else{
            this.newsData = data.find(x=>{
                return x._id === parId;
            })
        }
        
    }
    render(){
        if(this.newsData){
            const {title,content,subtitle,author,newsdate} = this.newsData;
            return (
                <div>
                    <h3 className="text-center">{title}</h3>
                    <p>{subtitle}</p>
                    <p>{author}</p>
                    <p>{newsdate}</p>
                    <p>{content}</p>
                </div>
            )
        }else{
            return (
                <div>
                    <h2>error</h2>
                    <a href="/" className="btn btn-primary">返回首页</a>
                </div>
            )
        } 
    }
}

const getValue = state=>{
    return {
        allNewsList:state.news.allNewsList
    }
}

const DetailConText = connect(getValue,{fetchGetAllNewsList})(Detail);



export default DetailConText;