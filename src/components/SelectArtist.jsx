/**
 * @brief Component for selecting an artist whose detailed
 * information shall be shown.
 *
 * @author Jakub Šuráň (xsuran07@stud.fit.vutbr.cz)
 * @file SelectArtist.jsx
 */

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

/**
 * @brief List with objects that represent different artists (their names
 * and ID assigned by spotify REST API).
 */
export const artistsList = [
  { name: 'Avicii', id: '1vCWHaC5f2uS3yhpwWbIA6' },
  { name: 'Pitbull', id: '0TnOYISbd1XYRBk9myaseg' },
  { name: 'Martin Garix', id: '60d24wfXkVzDSfLS6hyCjZ' }
];

/**
 * @brief Select component which allows user to pick artist about which
 * information shall be displayed..
 *
 * @param artistID State variable storing ID of currently picked artist.
 * @param setAristID Setter function for artistID state variable.
 */
export const SelectArtist = ({ artistID, setArtistID }) => {
  const handleChange = (event) => {
    setArtistID(event.target.value);
  };

  return (
    <FormControl sx={{ m:1, minWidth: 150 }}>
      <InputLabel id='select-artist-label'>Artist</InputLabel>
      <Select
        id='select-artist'
        labelId='select-artist-label'
        label='Artist'
        value={artistID}
        onChange={handleChange}
      >
        {artistsList.map(artist =>
          <MenuItem key={artist.id} value={artist.id}>{artist.name}</MenuItem>
        )}
      </Select>
      <FormHelperText>Select artist to display info about</FormHelperText>
    </FormControl>
  );
}
