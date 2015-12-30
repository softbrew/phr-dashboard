/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Journal React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import Stores
import JournalStore from './stores/JournalStore';
// import Components
import NewPost from './components/NewPost.jsx';
import PostList from './components/PostList.jsx';

class Journal extends React.Component {
    render () {
        return (
            <div className="row">
                <NewPost></NewPost>
                <PostList></PostList>
            </div>
        );
    }
}

Journal.propTypes = {
};

export default Journal;
