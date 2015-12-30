/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Journal NewPost React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import Actions
import JournalActions from '../actions/JournalActions';

class NewPost extends React.Component {
    constructor() {
        super();
        this.state = {
            previousPost: ''
        };
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="input-group">
                        <input type="text" ref={(text) => {this.newPost = text;}} className="form-control" placeholder="What's happening now" aria-describedby="sizing-addon1"/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this._onNewPost.bind(this)}>Post</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    _onNewPost(e) {
        console.log('NewPost _onNewPost');
        e.preventDefault();
        JournalActions.newPost(this.newPost.value);
        this.setState({
            previousPost: this.newPost.value
        });
    }
}

NewPost.PropTypes = {
};

export default NewPost;
