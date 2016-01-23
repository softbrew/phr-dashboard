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
import MedicalRecordConstants from '../constants/MedicalRecordConstants';

class MedicalRecordActions extends BaseActions {
    constructor() {
        super();
    }

    static getMedicalRecords() {
        console.log('MedicalRecordActions getMedicalRecords');

        function recursive(links, options, result, callback) {
            console.log('call recursive: ', result);
            let nextURL = null;
            for(let link of links) {
                if(link.relation === 'next') {
                    nextURL = link.url.replace(options.fhirServerURL, '/fhir');
                }
            }
            console.log('nextURL : ', nextURL);
            if(nextURL) {
                axios.get(nextURL, {
                    headers: options.headers
                }).then(res => {
                    for(let report of res.data.entry) {
                        result.push(report.resource);
                    }
                    recursive(res.data.link, options.headers, result, callback);
                }).catch(err => {
                    callback(err.data, result);
                });
            } else {
                callback(null, result);
            }
        }

        let initLink = [{
            "relation": "next",
            "url": `/fhir/DiagnosticReport?patient=14356`
        }];

        recursive(initLink, {
            headers: this.getHeaders(),
            fhirServerURL: this.getUser().fhirServerList[0].url
        }, [], (err, result) => {
            console.log('MedicalRecordActions get reports : ', err, result);
            Dispacher.dispatch({
                actionType: MedicalRecordConstants.GET_MEDICAL_RECORDS,
                medicalRecords: result
            });
        });
    }

}

export default MedicalRecordActions;
