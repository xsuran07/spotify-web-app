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

/**
 * @brief Component which creates header of the table.
 *
 * @param header String to be used in header.
 */
const ArtistTableHeader = ({ header }) => {
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
const ArtistImage = ({ image }) => {
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
 * @todo Current approach resemble prop drilling. Could be solved with useContext hook.
 */
export const ArstistInfoTable = ({ header, props, image }) => {
  return (
    <TableContainer style={{ width: '100%', maxWidth: 600 }} component={Paper}>
      <Table size='small' aria-label='a dense table'>
        <TableHead>
          <ArtistTableHeader header={header} />
        </TableHead>
        <TableBody>
          {image &&
            <ArtistImage image={image} />}
          {props.map((prop, i) => (
            <ArtistProp key={i} prop={prop} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}