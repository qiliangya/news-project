import React from 'react';
import './index.scss';

class Search extends React.Component{
    render(){
        return (
            <div className="container">
                <div className="mysearch">
                    <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for..."/>
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button">Go!</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{paddingTop:'10px'}}>
                        <div className="col-lg-4 col-lg-offset-4">
                            <a href="javascript:;">热点新闻</a>&nbsp;&nbsp;
                            <a href="javascript:;">娱乐一下</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Search;







