/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * JournalStore
 */

"use strict";

import Dispatcher from '../../util/Dispatcher';
import EventEmitter from 'events';
import JournalConstants from '../constants/JournalConstants';

class JournalStore extends EventEmitter {
    constructor() {
        super();
        this.CHANGE_EVENT = 'journal_change';
        this.posts = [];
    }

    _setPost(post) {
        this.posts.push(post);
    }

    _setPosts(posts) {
        this.posts = posts;
    }

    getPosts() {
        return this.posts;
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }
    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        this.removeListener(callback);
    }
}

const journalStore = new JournalStore();

Dispatcher.register(action => {
    switch (action.actionType) {
        case JournalConstants.NEW_POST:
            journalStore._setPost(action.post);
            journalStore.emitChange();
            break;
        case JournalConstants.UPDATE_POSTS:
            journalStore._setPosts(action.posts);
            journalStore.emitChange();
            break;
        default:
            console.log('journalStore: no action found.');
    }
    return true;
});

export default journalStore;
