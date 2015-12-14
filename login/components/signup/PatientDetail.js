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
                        <dd>{`${patient.name[0].given.toString().replace(/,/g,' ')} ${patient.name[0].family.toString()}`}</dd>
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
                                <strong>{patient.address[0].use.toUpperCase()}</strong><br/>
                                {patient.address[0].line.toString()}<br/>
                                {`${patient.address[0].city}, ${patient.address[0].state}. ${patient.address[0].postalCode}`}<br/>
                                <abbr title="Phone">P:</abbr> {patient.telecom[1].value}
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
