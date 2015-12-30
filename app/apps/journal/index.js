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
// import Actions
import JournalActions from './actions/JournalActions';

class Journal extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: JournalStore.getPosts()
        };
    }

    componentDidMount() {
        JournalStore.addChangeListener(this._onChange.bind(this));
        JournalActions.getPosts();
    }
    componentWillUnmount() {
        JournalStore.removeChangeListener(this._onChange.bind(this));
    }

    render () {
        return (
            <div>
                <NewPost></NewPost>
                <PostList postList={this.state.posts}></PostList>
            </div>
        );
    }

    _onChange() {
        console.log('Journal _onChange : ', JournalStore.getPosts());
        this.setState({
            posts: JournalStore.getPosts()
        });
    }
}

Journal.propTypes = {
};

export default Journal;
