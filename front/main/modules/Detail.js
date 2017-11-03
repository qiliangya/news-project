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
    changeDate(date){       //需要一个实例化日期对象
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();  
        var minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        return y + '-' + m + '-' + d+' '+h+':'+minute;  
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
                    <p>{this.changeDate(new Date(newsdate))}</p>
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