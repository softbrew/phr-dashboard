'use strict';

import React, { PropTypes } from 'react';

class PatientDetail extends React.Component {
    render() {
        if(this.props.isPatientImported) {
            const patient = this.props.patient;
            return (
                <div>
                    {patient.id && <dl className="dl-horizontal">
                        <dt>Patient ID</dt>
                        <dd>{patient.id}</dd>
                    </dl>}
                    {patient.name && <dl className="dl-horizontal">
                        <dt>Name</dt>
                        <dd>{`${patient.name.given} ${patient.name.family}`}</dd>
                    </dl>}
                    {patient.gender && <dl className="dl-horizontal">
                        <dt>Gender</dt>
                        <dd>{patient.gender}</dd>
                    </dl>}
                    {patient.birthDate && <dl className="dl-horizontal">
                        <dt>Birthday</dt>
                        <dd>{patient.birthDate}</dd>
                    </dl>}
                    {patient.address && <dl className="dl-horizontal">
                        <dt>Address</dt>
                        <dd>
                            <address>
                                <strong>{patient.address.use}</strong><br/>
                                {patient.address.line}<br/>
                                {`${patient.address.city}, ${patient.address.state}. ${patient.address.postalCode}`}<br/>
                                <abbr title="Phone">P:</abbr> {patient.telecom}
                            </address>
                        </dd>
                    </dl>}
                </div>
            );
        } else {
            return null;
        }
    }
}

export default PatientDetail;
