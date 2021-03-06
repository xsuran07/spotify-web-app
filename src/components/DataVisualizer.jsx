/**
 * @brief Component for displaying data
 * about artist and his albums.
 *
 * @author Jakub Šuráň (xsuran07@stud.fit.vutbr.cz)
 * @file DataVisualizer.jsx
 */

import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { Artist } from './Artist';
import { Albums } from './Albums';

import { getArtistAndAlbums } from '../shared/api';

/**
 * @brief Component which fetches and visualizes data
 * about artist and his albums.
 *
 * @param token State variable storing access token to spotify API.
 * @param artistID State variable storing ID of currently picked artist.
 */
export const DataVisualizer = ({ token, artistID }) => {
  const [ artist, setArtist ] = useState(null);
  const [ albums, setAlbums ] = useState([]);
  const [ fetchResult, setFetchResult ] = useState({ valid: false, loding: true });

  useEffect(() => {
    if(token && artistID) {
      const calbacks = {
        artistData: setArtist,
        albumsData: setAlbums,
        result: setFetchResult
      };

      // fetch data connected with particular artist
      setFetchResult(prev => {
        return { ...prev, loading: true }});
      getArtistAndAlbums(token, artistID, calbacks);
    }
  }, [token, artistID]);

  const content = (fetchResult.valid)?
    <Stack
      style={{ width: '100%' }}
      justifyContent='center'
      alignItems='center'
      spacing={2}
      direction={{ xs: 'column', md: 'column', lg: 'row' }}
    >
      <Artist artist={artist} albums={albums} />
      <Albums albums={albums} />
    </Stack> :
    <Typography>Failed to fetch data!</Typography>

  return (
    <>
      {(fetchResult.loding &&
        <Typography>Fetching data...</Typography>) || content}
    </>
  );
}
