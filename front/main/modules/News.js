import React from 'react';
import {connect} from 'react-redux';
import {fetchGetNews} from './../action/news';
import Sider from './public/Sider/index';
import Path from './public/Path/index'

class News extends React.Component{
    constructor(){
        super();
        this._href = window.location.href;
    }

    changePage(e){
        var page = e.currentTarget.getAttribute('data-page');
        this.props.fetchGetNews(this.props.params.id,parseInt(page));
    }

    componentWillMount(){       
        let {fetchGetNews,params,news} = this.props;
        var id = params.id;
        this.props.fetchGetNews(id);
    }

    render(){
        let {fetchGetNews,params,news} = this.props;
        let _href = window.location.href;
        let tag = this.props.location.query.text;   //路径的内容
        let pathName = this.props.location.pathname;    //路径
        let pages = 1;
        let outputPages = [];
        if(news.rows){
            pages = Math.ceil( news.rows.length/2);
        }
        if(pages == 1){
            outputPages.push(
                <li key={1}>
                    <a href="javascript:void(0);" data-page={1} onClick={e=>{this.changePage(e)}}>{1}</a>
                </li>
            )
        }else{
            for(let i = 1;i<pages;i++){
                outputPages.push(
                    <li key={i}>
                        <a href="javascript:void(0);" data-page={i} onClick={e=>{this.changePage(e)}}>{i}</a>
                    </li>
                )
            }

        }
        if(this._href !== _href){
            fetchGetNews(params.id);
            this._href = _href;
        }




        return (
            <div>
                <Path tag={tag} pathName={pathName}/>
                <ul className="list-group">
                    {
                        news.rows?news.rows.map((item,index)=>{
                            return (
                                <li className="list-group-item" key={index}>
                                    <div className="panel panel-primary">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="panel-body text-overflow">
                                            {item.content}
                                        </div>
                                        <div className="panel-footer">
                                            <div className="clearfix">
                                                <a href="javascript:void(0)" className="pull-left">查看详情</a>
                                                <a href="javascript:void(0)" className="pull-right">查看评论</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }):null
                    }
                </ul>
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li>
                            <a href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {outputPages}
                        <li>
                            <a href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const getValue = state=>{
    return {
        news:state.news.news
    }
}

const NewsConText = connect(getValue,{fetchGetNews})(News);

export default NewsConText;