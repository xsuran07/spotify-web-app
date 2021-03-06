/**
 * @brief Main component of the whole application.
 *
 * @author Jakub Šuráň (xsuran07@stud.fit.vutbr.cz)
 * @file App.js
 */

import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { SelectArtist, artistsList } from './components/SelectArtist';
import { DataVisualizer } from './components/DataVisualizer';

import { getToken } from "./shared/api";

/**
 * @brief Main component of the application.
 */
export default function App() {
  const [ artistID, setArtistID ] = useState(artistsList[0].id);
  const [ token, setToken ] = useState('');
  const [ fetchResult, setFetchResult ] = useState({ valid: false, loding: true });

  useEffect(() =>{
    const fetchToken = () => {
      setFetchResult(prev => {
        return { ...prev, loading: true }});
      getToken(setToken, setFetchResult);
    }

    // fetch token when component mounts and periodically refresh it
    fetchToken();
    const interval = setInterval(fetchToken, 3500000)

    return () => clearInterval(interval);
  }, []);

  const mainConent = (fetchResult.valid) ?
    <DataVisualizer token={token} artistID={artistID} /> :
    <Typography>Failed to get access token!</Typography>;

  return (
    <Stack
      spacing={6}
      alignItems='center'
    >
      <h1>Spotify data visualization</h1>
      <SelectArtist artistID={artistID} setArtistID={setArtistID} />
      <Divider style={{ width: '100%' }}/>
      {(fetchResult.loding &&
        <Typography>Loading...</Typography>) || mainConent
      }
    </Stack>
  );
}
