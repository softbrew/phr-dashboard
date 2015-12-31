/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * JournalActions
 */

"use strict";

import axios from 'axios';
import url from 'url';
import BaseActions from '../../util/BaseActions';

import Dispacher from '../../util/Dispatcher';
import JournalConstants from '../constants/JournalConstants';

class JournalActions extends BaseActions {
    constructor() {
        super();
    }

    static newPost(text) {
        console.log('JournalActions newPost : ', text);
        axios.post(`/apps/${JournalConstants.APP_ID}/${this.getUser().username}`, {
                text: text,
                createdAt: Date.now()
        }, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/apps newPost : ', res);
            Dispacher.dispatch({
                actionType: JournalConstants.NEW_POST,
                post: res.data
            });
        }).catch(err => {
            console.error(err);

        });
    }

    static getPosts() {
        console.log('JournalActions getPosts');
        axios.get(`/apps/${JournalConstants.APP_ID}/${this.getUser().username}`, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/apps getPosts : ', res);
            Dispacher.dispatch({
                actionType: JournalConstants.UPDATE_POSTS,
                posts: res.data
            });
        }).catch(err => {
            console.error(err);

        });
    }

    static editPost(post) {
        console.log('JournalActions editPost : ', post);
        post.createdAt = Date.now();
        axios.put(`/apps/${JournalConstants.APP_ID}/${this.getUser().username}`, post, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/apps editPost : ', res);
            Dispacher.dispatch({
                actionType: JournalConstants.EDIT_POST,
                post: res.data
            });
        }).catch(err => {
            console.error(err);

        });
    }

    static deletePost(post) {
        console.log('JournalActions deletePost : ', post);
        let deleteURL = url.format({
            pathname: `/apps/${JournalConstants.APP_ID}/${this.getUser().username}`,
            query: {
                id: post._id,
                rev: post._rev
            }
        });
        console.log(deleteURL);
        axios.delete(deleteURL, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/apps deletePost : ', res);
            Dispacher.dispatch({
                actionType: JournalConstants.DELETE_POST,
                post: res.data
            });
        }).catch(err => {
            console.error(err);

        });
    }
}

export default JournalActions;
