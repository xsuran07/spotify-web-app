/**
 * @brief Function for handling API calls.
 *
 * @author Jakub Šuráň (xsuran07@stud.fit.vutbr.cz)
 * @file api.js
 */

import { Buffer } from 'buffer';

// CONSTANTS

const AUTH_BASE = 'https://accounts.spotify.com/api/token';
const API_BASE = 'https://api.spotify.com/v1/';
const MAX_ALBUM_CNT = 50;
const ALBUM_TYPES = 'album%2Csingle';
const ALBUM_MARKET = 'CZ';

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

/**
 * @brief Tries to strip unnecessary characters from long strins. Short strings
 * are left unmodified.
 *
 * @param str String to be stripped.
 * @returns Stripped string.
 */
const stripLongStr = (str) => {
  if(str.length > 45) {
    return str.replace(/(\[.*\])|(\(.*\))/g, '');
  }

  return str;
}

/**
 * @brief Process each album from given list. As a result,
 * each object contains only relevant data.
 *
 * @param arr Array wit fetched albums.
 * @returns processed array.
 */
const processAlbums = (arr) => {
  return arr.map(obj => (
    {
      id: obj.id,
      image: obj.images[obj.images.length - 1].url,
      name: stripLongStr(obj.name),
      date: obj.release_date,
      tracks: obj.total_tracks
    }));
}

/**
 * @brief Fetches data with information about particular artist.
 *
 * @param token Access token to spotify API.
 * @param artistID ID of artist to fetch info about.
 * @param dataHandler Callback which handles processing of the fetched data.
 * @returns true if fetching succeeds, false otherwise.
 */
const getArtist = async (token, artistID, dataHandler) => {
  const params = {
    base: API_BASE,
    page: `artists/${artistID}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: null
  }
  const result = await fetchData(params);
  const resultStatus = result.error === null;

  dataHandler((resultStatus)? result.data : {});
  return resultStatus;
}

/**
 * @brief Retrieves all albums by particular artistSpotify API allows
 * fetching only 50 albums at ones
 * (https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-albums).
 * For that reason, it is necessary to perform fetching in a loop.
 *
 * @param token Access token to spotify API.
 * @param artistID ID of artist whose albums shall be fetched.
 * @param dataHandler Callback which handles
 * @returns true if all fetching succeeds, false otherwise.
 */
const getAlbums = async (token, artistID, dataHandler) => {
  let url = '';
  let albums = [];
  const page =
    `artists/${artistID}/albums?limit=${MAX_ALBUM_CNT}&include_groups=${ALBUM_TYPES}&market=${ALBUM_MARKET}`;

  const params = {
    base: API_BASE,
    page: page,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: null
  }

  do {
    const result = await fetchData(params);

    if(result.error) {
      dataHandler([]);
      return false;
    }

    // add retrived albums to accumulator and get url of the next page with albums
    albums = [...albums, ...result.data.items];
    url = result.data.next;

    params.base = url;
    params.page = '';
  } while(url)

  dataHandler(processAlbums(albums));
  return true;
}

// PUBLIC FUNCTIONS

/**
 * @brief Function performs necessary API call to extract authentication token which enables
 * access to spotify REST API. For the simplicity, application uses client credentials flow
 * (https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/).
 * The client credentials are extracted from the environment variables.
 *
 * @param dataHandler Callback which processes the extracted access token.
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

/**
 * @brief Fetches data with information about particular artist
 * and his albums. These data needs to be retrieved in two
 * seperate queries. Both are performed in paralell.
 *
 * @param token Access token to spotify API.
 * @param artistID ID of artist whose albums shall be fetched.
 * @param calbacks Object with three callbacks - handler for
 * fetched artist info, handler for fetched albums and
 * function to set result of the fetching.
 */
export const getArtistAndAlbums = async (token, artistID, calbacks) => {
  const result = await Promise.all([
    getArtist(token, artistID, calbacks.artistData),
    getAlbums(token, artistID, calbacks.albumsData),
  ]);

  const resultStatus = result[0] && result[1];
  calbacks.result({ valid: resultStatus, loading: false });
}
