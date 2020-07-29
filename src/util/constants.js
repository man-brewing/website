import moment from 'moment';

/**
 * Set default format.
 */
moment.defaultFormat = 'YYYY-MM-DD';

export const ApiDateFormat = 'YYYY-MM-DD HH:mm:ss';


let apiUrl;
switch (window.location.hostname) {
    case '127.0.0.1':
    case 'localhost':
        apiUrl = 'http://localhost:3001/';
        break;

    default:
        apiUrl = 'http://krimthered.ddns.net/api/';
        break;
}

export const ApiUrl = apiUrl;