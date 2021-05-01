import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const TableComponent = ({ rows, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useSelector((state) => state.theme.dataThemeDefault);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columFormat = columns.map((col) => ({
    id: col.key,
    label: col.title,
    format: col.render,
  }));

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    row: {
      color: theme.name === 'Dark' ? 'white' : 'black',
    },
    pagination: {
      color: theme.name === 'Dark' ? 'white' : 'black',
    },
  });
  const classes = useStyles();
  if (!rows) {
    return <p>Loading</p>;
  }

  return (
    <>
      <TableContainer>
        <Table className={classes.container}>
          <TableHead>
            <TableRow>
              {columFormat.map((column) => (
                <TableCell className={classes.row} key={column.id}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columFormat.map((column) => (
                  <TableCell
                    className={classes.row}
                    key={column.id}
                    align={column.align}
                  >
                    {column.format(
                      column.id === 'action' ? row : row[column.id],
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

TableComponent.propTypes = {
  rows: propTypes.arrayOf(Object).isRequired,
  columns: propTypes.arrayOf(Object).isRequired,
};

export default TableComponent;
