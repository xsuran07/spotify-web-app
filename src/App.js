import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { SelectArtist, artistsList } from './components/SelectArtist';

export default function App() {
  const [ artistID, setArtistID ] = useState(artistsList[0].id);

  return (
    <Stack
      spacing={6}
      alignItems='center'
    >
      <h1>Spotify data visualization</h1>
      <SelectArtist artistID={artistID} setArtistID={setArtistID} />
      <Divider style={{ width: '100%' }}/>
    </Stack>
  );
}
