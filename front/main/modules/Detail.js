import React from 'react';
import {connect} from 'react-redux';
import {fetchNewsList} from '../action/news';
import {hashHistory} from 'react-router';

import _ from 'lodash';

class Detail extends React.Component{
    constructor(){
        super();
        this.newsData = '';
    }
    componentWillMount(){
        const {newsList,params} = this.props;
        const parId = params.id;
        const data = newsList.rows;
        if(newsList.length === 0){
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
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                    <p>{author}</p>
                    <p>{newsdate}</p>
                    <p>{content}</p>
                </div>
            )
        } 
    }
}

const getValue = state=>{
    return {
        newsList:state.news.newsList
    }
}

const DetailConText = connect(getValue)(Detail);



export default DetailConText;