/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Journal Post React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import Actions
import JournalActions from '../actions/JournalActions';

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            text: ''
        };
    }

    render () {
        var date = new Date(this.props.post.createdAt);
        date = date.toLocaleString();
        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <hr/>
                    <div className="row">
                        <div className="col-md-11">
                            <blockquote>
                                {!this.state.isEditing && <h4>{this.props.post.text}</h4>}
                                {this.state.isEditing && <textarea ref={(text) => {this.editPost = text;}} className="form-control" rows="1" placeholder="What's happening now" value={this.state.text} onChange={this._onEditing.bind(this)}></textarea>}
                                <footer>{date}</footer>
                            </blockquote>
                        </div>
                        <div className="col-md-1">
                            {!this.state.isEditing && <button type="button" className="btn btn-primary btn-xs" aria-label="Left Align" onClick={this._onEdit.bind(this)}>
                              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>}
                            {this.state.isEditing && <button type="button" className="btn btn-success btn-xs" aria-label="Left Align" onClick={this._onSave.bind(this)}>
                              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            </button>}
                            <button type="button" className="btn btn-danger btn-xs" aria-label="Left Align" onClick={this._onDelete.bind(this)}>
                              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _onChange() {
        console.log('Post _onChange');
    }

    _onEdit(e) {
        console.log('Post _onEdit');
        this.setState({
            isEditing: true,
            text: this.props.post.text
        });
    }

    _onEditing(e) {
        console.log('Post _onEditing');
        this.setState({
            isEditing: true,
            text: this.editPost.value
        });
    }

    _onSave(e) {
        console.log('Post _onSave');
        let post = this.props.post;
        post.text = this.editPost.value;
        JournalActions.editPost(post);
        // Change state
        this.setState({
            isEditing: false,
            text: this.editPost.value
        });
    }

    _onDelete(e) {
        console.log('Post _onDelete');
        JournalActions.deletePost(this.props.post);
    }
}

Post.PropTypes = {
    post: PropTypes.object.isRequired
};

export default Post;
