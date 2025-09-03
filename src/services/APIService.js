import {appConfig} from '../config/app.js';

function endpointUrl(endpoint) {
    return `${appConfig.apiURL}${endpoint}`;
}

export {
    endpointUrl
};