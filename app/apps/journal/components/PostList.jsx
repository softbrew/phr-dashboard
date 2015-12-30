/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Journal PostList React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import Component
import Post from './Post.jsx';

class PostList extends React.Component {
    render () {
        return (
            <div>
                <Post></Post>
            </div>
        );
    }
}

PostList.PropTypes = {

};

export default PostList;
