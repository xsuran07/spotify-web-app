/**
 * @brief Component for displaying information about
 * artist in form of table.
 *
 * @author Jakub Šuráň (xsuran07@stud.fit.vutbr.cz)
 * @file ArtistInfoTable.jsx
 */

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';

import { ArtistContext } from './Artist';

/**
 * @brief Component which creates header of the table.
 *
 * @param header String to be used in header.
 */
const ArtistTableHeader = () => {
  const { header } = useContext(ArtistContext);

  return (
    <TableRow>
      <TableCell  style={{height: 39 }} align='center' colSpan={2}>
        { header }
      </TableCell>
    </TableRow>
  );
}

/**
 * @brief Component for displaying artist's image in a table row.
 *
 * @param image Image url to display.
 */
const ArtistImage = () => {
  const { image } = useContext(ArtistContext);

  return (
    <TableRow>
      <TableCell align='center' colSpan={2}>
        <img src={image} alt='' />
      </TableCell>
  </TableRow>
  );
}

/**
 * @brief Component which displays artist's properties
 * in form of table rows.
 *
 * @param prop Array with properties to display.
 */
const ArtistProp = ({ prop }) => {
  return (
    <TableRow>
      <TableCell><strong>{prop.propName}</strong></TableCell>
      <TableCell>{prop.propValue}</TableCell>
    </TableRow>
  );
}

/**
 * @brief Component which visualizes information
 * about artist in a table.
 *
 * @param header String to be used in header.
 * @param prop Array with properties to display.
 * @param image Artist's image url.
 */
export const ArtistInfoTable = () => {
  const { image, props } = useContext(ArtistContext);

  return (
    <TableContainer style={{ width: '100%', maxWidth: 650 }} component={Paper}>
      <Table size='small' aria-label='a dense table'>
        <TableHead>
          <ArtistTableHeader />
        </TableHead>
        <TableBody>
          {image &&
            <ArtistImage />}
          {props.map((prop, i) => (
            <ArtistProp key={i} prop={prop} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
