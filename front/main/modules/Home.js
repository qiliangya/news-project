import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {fetchNewsCateList,fetchNewsList} from '../action/news';

import './index.scss';

class Home extends React.Component{
    componentWillMount(){
        this.props.fetchNewsCateList();
        this.props.fetchNewsList();
    }
    lookDetail(ev){
        var _id = ev.target.getAttribute('data-inx');
        hashHistory.push(`/detail/${_id}`);
    }
    render(){  
        const {newsCateList,newsList} = this.props;
        return (
            <div className="container">
                <div className="row row-offcanvas row-offcanvas-right">
                    <div className="col-xs-12 col-sm-9">
                        <p className="pull-right visible-xs">
                            <button type="button" className="btn btn-primary btn-xs" data-toggle="offcanvas">Toggle nav</button>
                        </p>
                        <div className="row">
                            <img className="fill" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509619619649&di=46971c9513a99afaa1c945c124ae1737&imgtype=0&src=http%3A%2F%2Fimages.tuniu.com%2Fimages%2F2013-08-09%2F3%2F30uYY755ppdd1119.jpg"/>                          
                        </div>
                        <div className="row">
                            <h2>热点新闻</h2>
                            
                            <div className="box clearfix">
                                {
                                newsList.rows?newsList.rows.map((item,index)=>{
                                return (
                                    <div className="col-xs-6 col-lg-4" key={index}>
                                        <h4 className="text-center text-hidden">{item.title}</h4>                            
                                        <p><a className="btn btn-primary" href="javascript:void(0);" onClick={ev=>{this.lookDetail(ev)}} role="button" data-inx={item._id}>点击查看详情 &raquo;</a></p>
                                    </div>
                                )
                                }):null
                                }
                            </div>
                        </div>
                    </div>
                
                    <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
                        <div className="list-group">
                            <a href="javascript:void(0);" className="list-group-item active">Link</a>
                            <a href="javascript:void(0);" className="list-group-item">Link</a>
                            <a href="javascript:void(0);" className="list-group-item">Link</a>
                            <a href="javascript:void(0);" className="list-group-item">Link</a>
                            <a href="javascript:void(0);" className="list-group-item">Link</a>
                            <a href="javascript:void(0);" className="list-group-item">Link</a>
                            <a href="javascript:void(0);" className="list-group-item">Link</a>
                            <a href="javascript:void(0);" className="list-group-item">Link</a>
                            <a href="javascript:void(0);" className="list-group-item">Link</a>
                            <a href="javascript:void(0);" className="list-group-item">Link</a>
                        </div>
                    </div>
                </div>
            </div>        
        )
    }
}

const getValue = state=>{
    return {
        newsCateList:state.cate.newsCateList,
        newsList:state.news.newsList
    }
}

const HomeConText = connect(getValue,{fetchNewsCateList,fetchNewsList})(Home);
module.exports = HomeConText;