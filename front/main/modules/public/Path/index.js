import React from 'react';
import "./index.scss";

class Path extends React.Component{

    render(){
        let {tag} = this.props;
        return (
            <div>
                <ol className="breadcrumb">
                    <li><a href="/">首页</a></li>
                    <li className="active">{tag}</li>
                </ol>
            </div>
        )
    }
}

module.exports = Path;