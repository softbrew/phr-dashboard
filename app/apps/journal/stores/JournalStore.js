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

    _addPost(post) {
        this.posts.push(post);
    }
    _setPosts(posts) {
        this.posts = posts;
    }
    _editPost(post) {
        for(let i in this.posts) {
            if(post._id === this.posts[i]._id) {
                this.posts[i] = post;
                return this.posts;
            }
        }
    }
    _deletePost(post) {
        for(let i in this.posts) {
            if(post._id === this.posts[i]._id) {
                this.posts.splice(i,1);
                return this.posts;
            }
        }
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
    switch(action.actionType) {
        case JournalConstants.NEW_POST:
            journalStore._addPost(action.post);
            journalStore.emitChange();
            break;
        case JournalConstants.UPDATE_POSTS:
            journalStore._setPosts(action.posts);
            journalStore.emitChange();
            break;
        case JournalConstants.EDIT_POST:
            journalStore._editPost(action.post);
            journalStore.emitChange();
            break;
        case JournalConstants.DELETE_POST:
            journalStore._deletePost(action.post);
            journalStore.emitChange();
            break;
        default:
            console.log('journalStore: no action found.');
    }
    return true;
});

export default journalStore;
