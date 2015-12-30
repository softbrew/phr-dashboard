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
                    <p>{date}</p>
                    <blockquote>
                        <p>{this.props.post.text}.</p>
                    </blockquote>
                </div>
            </div>
        );
    }
}

Post.PropTypes = {
    post: PropTypes.object.isRequired
};

export default Post;
