import React, { PropTypes } from 'react';
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
import helpers from '../utils/helpers';
import Rebase from 're-base';

var base = Rebase.createClass('https://glowing-heat-4910.firebaseio.com/');

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            bio:{},
            repos:[]
        };
    }

    init() {
        this.ref = base.bindToState(this.router.getCurrentParams().username, {
            context: this,
            asArray: true,
            state: 'notes'
        });

        helpers.getGithubInfo(this.router.getCurrentParams().username)
        .then((dataObj)=> {
            this.state = {
                bio: dataObj.bio,
                repos: dataObj.repos
            };
        });
    }

    componentWillMount() {
        this.router = this.context.router;
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillReceiveProps(nextProps) {
        base.removeBinding(this.ref);
        this.init();
    }

    handleAddNote(newNote) {
        base.post(this.router.getCurrentParams().username, {
            data: this.state.notes.concat([newNote])
        });
    }

    render () {
        var username = this.router.getCurrentParams().username;
        return (
            <div className="row">
                <div className="col-md-4">
                    <UserProfile username={username} bio={this.state.bio}></UserProfile>
                </div>
                <div className="col-md-4">
                    <Repos username={username} repos={this.state.repos}></Repos>
                </div>
                <div className="col-md-4">
                    <Notes username={username} notes={this.state.notes} addNote={this.handleAddNote.bind(this)}></Notes>
                </div>
            </div>
        );
    }
}

Profile.contextTypes = {
    router: PropTypes.func.isRequired
};

export default Profile;
