import React from 'react';
import './index.scss';

class Footer extends React.Component{
    render(){
        return (
            <div className="foot">
                <hr className="featurette-divider"/>
                <div className="container">
                    <footer>
                        <p className="pull-right"><a href="#">Back to top</a></p>
                        <p>© 2016 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
                    </footer>
                </div>
            </div>
        )
    }
}

module.exports = Footer;