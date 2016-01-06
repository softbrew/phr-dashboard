/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * ParticipantList React Component
 */

"use strict";

import React, { PropTypes } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';

class ParticipantList extends React.Component {
    constructor() {
        super();
    }

    render() {
        let list = this.props.participantList.map((participant, index) => {
            let type = "Not Given";
            if(participant.type.length) {
                type = participant.type[0].coding[0].code;
            }
            return <dl key={'addedParticipantList' + index} className="dl-horizontal">
                    <dt>Type</dt>
                    <dd>{type}</dd>
                    <dt>Actor</dt>
                    <dd>{(participant.actor.display)? participant.actor.display : participant.actor.reference}</dd>
                    <dt>Required</dt>
                    <dd>{participant.required}</dd>
                    <dt>Status</dt>
                    <dd>{participant.status}</dd>
                </dl>;
        });

        return (
            <div className="row">
                {list}
            </div>
        );
    }
}

ParticipantList.PropTypes = {
    participantList: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default ParticipantList;
