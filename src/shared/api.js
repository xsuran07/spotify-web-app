/**
 * @brief Function for handling API calls.
 *
 * @author Jakub Šuráň (xsuran07@stud.fit.vutbr.cz)
 * @file api.js
 */

import { Buffer } from 'buffer';

// CONSTANTS

const AUTH_BASE = 'https://accounts.spotify.com/api/token';

// PRIVATE FUNCTIONS

/**
 * @brief Common wrapper for API calls.
 *
 * @param params Parameters for API call in form of object -
 * { base, page, method, headers, body }.
 * @returns object with fetched data and description of caught
 * error (if any)- { data, error }.
 */
 const fetchData = async (params) => {
  try {
    const response = await fetch(params.base + params.page,
      {
        method: params.method,
        headers: params.headers,
        body: params.body
      });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return { data: data, error: null };
  } catch(e) {
      return { data: {}, error: e };
  }
}

/**
 * @brief Tries to retrieve two values necessary for authentication. Values are
 * extracted from environment variables.
 *
 * @returns array with both extracted values if successful or empty array if at
 * least one of them is undefined.
 */
const getClientCredentials = () => {
  if(!process.env.REACT_APP_CLIENT_ID || !process.env.REACT_APP_CLIENT_SECRET) {
    return [];
  }

  return [process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET];
}

// PUBLIC FUNCTIONS

/**
 * @brief Function performs necessary API call to extract authentication token which enables
 * access to spotify REST API. For the simplicity, application uses client credentials flow
 * (https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/).
 * The client credentials are extracted from the environment variables.
 *
 * @param dataHandler Callback which process the extracted access token.
 * @param resultHandler Callback which processes result of the fetch.
 */
export const getToken = async (dataHandler, resultHandler) => {
  const credentials = getClientCredentials();

  // both client credentials from env variables has to be extracted
  if(credentials.length !== 2) {
    dataHandler('');
    resultHandler({valid: false});
    return;
  }

  // credentials has to be encoded in base64
  const encoded = Buffer.from(credentials[0] + ':' + credentials[1]).toString('base64');
  const params = {
    base: AUTH_BASE,
    page: '',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encoded}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };

  const result = await fetchData(params);
  const resultStatus = result.error === null;

  dataHandler((resultStatus)? result.data.access_token : '');
  resultHandler({ valid: resultStatus, loading: false });
}
