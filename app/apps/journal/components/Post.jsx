/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Journal Post React Component
 */

"use strict";

import React, { PropTypes } from 'react';

class Post extends React.Component {
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
                              <h4>{this.props.post.text}</h4>
                              <footer>{date}</footer>
                            </blockquote>
                        </div>
                        <div className="col-md-1">
                            <button type="button" className="btn btn-primary btn-xs" aria-label="Left Align">
                              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>
                            <button type="button" className="btn btn-danger btn-xs" aria-label="Left Align">
                              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Post.PropTypes = {
    post: PropTypes.object.isRequired
};

export default Post;
