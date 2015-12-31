/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * JournalActions
 */

"use strict";

import axios from 'axios';
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
                posts: res.data
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
        axios.put(`/apps/${JournalConstants.APP_ID}/${this.getUser().username}`, {
                _id: post._id,
                _rev: post._rev,
                text: post.text,
                createdAt: Date.now()
        }, {
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
}

export default JournalActions;
