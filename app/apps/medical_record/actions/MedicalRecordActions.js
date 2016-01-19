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
        axios.get(`/apps/${MedicalRecordConstants.APP_ID}/${this.getUser().username}`, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/apps getMedicalRecords : ', res);
            Dispacher.dispatch({
                actionType: MedicalRecordConstants.GET_MEDICAL_RECORDS,
                appointments: res.data
            });
        }).catch(err => {
            console.error(err);

        });
    }

}

export default MedicalRecordActions;
