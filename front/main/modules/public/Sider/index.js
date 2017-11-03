import React from 'react';
import {connect} from 'react-redux';
import NavLink from '../../public/NavLink/index'
import {fetchNewsCateList} from './../../../action/news';
import {hashHistory} from 'react-router';
class Sider extends React.Component{

    componentWillMount(){
        this.props.fetchNewsCateList();
    }

    lookNews(ev){
        var _id = ev.target.getAttribute('data-inx');
        hashHistory.push({pathname:`/news/${_id}`,query:{text:ev.target.innerHTML}});
    }

    render(){
        const {newsCateList} = this.props;
        return (
            <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
                <div className="list-group">
                    {
                        newsCateList.length>0?newsCateList[0].children.map((item,index)=>{
                            return (
                                <a href="javascript:void(0);" data-inx={item._id} onClick={ev=>{this.lookNews(ev)}} className="list-group-item" key={index}>{item.text}</a>
                            )
                        }):null
                    }
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

const SiderConText = connect(getValue,{fetchNewsCateList})(Sider);

module.exports = SiderConText;