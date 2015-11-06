import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

class SearchGithub extends React.Component {
    handleSubmit() {
        var username = this.usernameInput.value;
        var router = this.context.router;
        this.usernameInput.value = '';
        router.transitionTo('profile', {username:username});
    }

    render () {
        return (
            <div className="col-sm-12">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group col-sm-7">
                        <input type="text" className="form-control" ref={(ref) => this.usernameInput = ref}/>
                    </div>
                    <div className="form-group col-sm-5">
                        <button type="submit" className="btn btn-block btn-primary">Search Github</button>
                    </div>
                </form>
            </div>
        );
    }
}

SearchGithub.contextTypes = {
    router: PropTypes.func
};

export default SearchGithub;
