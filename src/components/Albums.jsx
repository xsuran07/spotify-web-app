/**
 * @brief Component for displaying data about albums by
 * particular artist.
 *
 * @author Jakub Šuráň (xsuran07@stud.fit.vutbr.cz)
 * @file Albums.jsx
 */

import { DataGrid } from '@mui/x-data-grid';

// definition of data grid columns
const columns = [
    {
        field: 'image',
        headerName: 'Logo',
        width: 100,
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => <img src={params.value} alt='' />,
    },
    {
        field: 'name',
        headerName: 'Album name',
        width: 300,
        headerAlign: 'center',
    },
    {
        field: 'date',
        headerName: 'Release date',
        width: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'tracks',
        headerName: 'Total tracks',
        width: 150,
        headerAlign: 'center',
        align: 'center',
    },
]

/**
 * @brief Components which displays information about
 * albums by particular artist.
 *
 * @param albums State variable storing array with album
 * representations.
 */
export const Albums = ({ albums }) => {
  return (
    <div style={{ height: 461, width: '100%', maxWidth: '720px' }}>
      {albums &&
        <DataGrid
          columns={columns}
          rows={albums}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnMenu
          rowHeight={70}
        />}
    </div>
  );
}
