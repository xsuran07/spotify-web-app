import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { SelectArtist, artistsList } from './components/SelectArtist';

import { getToken } from "./shared/api";

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
    <div>TODO</div> :
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
