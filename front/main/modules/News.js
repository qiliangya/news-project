import React from 'react';
import {connect} from 'react-redux';
import {fetchGetNews} from './../action/news';

class News extends React.Component{

    componentWillMount(){
        const {fetchGetNews,params} = this.props;
        fetchGetNews(params_id);
    }

    render(){
        return (
            <div>
                News
            </div>
        )
    }
}

const getValue = state=>{
    return {
        news:state.news.news
    }
}

const NewsConText = connect(getValue)(News);

export default NewsConText;