import React from 'react';

import './index.scss';

class Home extends React.Component{

    componentWillMount(){
        fetch('http://localhost:3000/cate/list',{method:'POST',cache:'reload'})
        .then(msg=>{
            return msg.json();
        })
        .then(data=>{
            console.log(data);
        })
    }
    render(){   
        const arr = [

        ]

        return (
            <div className="container pad-top">
                <div className="row text-center">
                    {
                        arr.map((item,index)=>{
                            return (
                                <div className="col-lg-4" key={index}>
                                    <img className="img-circle" src={item.img} width="140" height="140"/>
                                    <h2>{item.title}</h2>
                                    <p>{item.detail}</p>
                                    <p><a className="btn btn-primary" href="#" role="button">查看详情 »</a></p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

module.exports = Home;