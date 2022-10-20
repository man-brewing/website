import { ApiUrl } from '../util/constants';
import axios from 'axios';

/**
 * Gets the most recent environment records, defaulting to 20.
 * @param {*} count 
 */
export function getLatestEnvironmentData (count = 20) {
    // for testing broken api
    // return new Promise((resolve) => {
    //     setTimeout(resolve, 1000);
    // });

    return axios.get(ApiUrl + `history/${count}`);
}

/**
 * Gets the environment data between the dates.
 * @param {*} startDate 
 * @param {*} endDate 
 */
export function getEnvironmentData(startDate, endDate) {
    let uriStartDate = encodeURIComponent(startDate.startOf('day').toISOString(true));
    let uriEndDate = encodeURIComponent(endDate.endOf('day').toISOString(true));
    return axios.get(ApiUrl + `history/${uriStartDate}/${uriEndDate}`);
}