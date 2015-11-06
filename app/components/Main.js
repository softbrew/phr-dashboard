import React, { PropTypes } from 'react';
import SearchGithub from './SearchGithub';

class Main extends React.Component {
    render () {
        return (
            <div className="main-container">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="col-sm-7 col-sm-offset-2" style={{marginTop:15}}>
                        <SearchGithub />
                    </div>
                </nav>
                <div className="constainer">
                    {React.cloneElement(this.props.children, {...this.props})}
                </div>
            </div>
        );
    }
}

export default Main;
