/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Journal PostList React Component
 */

"use strict";

import React, {
    PropTypes
}
from 'react';
// import Component
import Post from './Post.jsx';

class PostList extends React.Component {
    constructor() {
        super();
    }

    render() {
        var posts = this.props.postList.map((post, index) => {
            return <Post post={post} key={index}></Post>;
        });

        return(
            <div>
                {posts}
            </div>
        );
    }
}

PostList.PropTypes = {
    postList: PropTypes.array.isRequired
};

export default PostList;
