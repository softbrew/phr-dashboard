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
                        <textarea ref={(text) => {this.newPost = text;}} className="form-control" rows="1" placeholder="What's happening now"></textarea>
                        <span className="input-group-btn">
                            <button className="btn btn-info" type="button" onClick={this._onNewPost.bind(this)}>New Post</button>
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
        this.newPost.value = '';
    }
}

NewPost.PropTypes = {
};

export default NewPost;
