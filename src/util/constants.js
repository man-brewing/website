import moment from 'moment';

/**
 * Set default format.
 */
moment.defaultFormat = 'YYYY-MM-DD';

let apiUrl;
switch (window.location.hostname) {
    case '127.0.0.1':
    case 'localhost':
        apiUrl = 'https://localhost:44367/beerroom/environment/';
        break;

    default:
        apiUrl = 'https://manbrewingapi.azurewebsites.net/beerroom/environment/';
        break;
}

export const ApiUrl = apiUrl;