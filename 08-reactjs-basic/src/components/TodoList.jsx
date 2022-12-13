import React from "react";
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const rows = [
  {
    title: "Menjadikan dia milikku",
    createdAt: "10/12/2022",
    status: false,
    id: 1,
  },
  {
    title: "Belajar dengan deep work",
    createdAt: "11/12/2022",
    status: false,
    id: 2,
  },
  { title: "Tugas pertemuan 9", createdAt: "12/12/2022", status: true, id: 3 },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableContainer: {
    marginTop: "20px",
  },
});

const TodoList = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">No</StyledTableCell>
            <StyledTableCell>Judul</StyledTableCell>
            <StyledTableCell align="center">dd/mm/yyyy</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Aksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell align="center">{i + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="center">{row.createdAt}</StyledTableCell>
              <StyledTableCell align="center">
                {row.status ? "Done" : "In Progress"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="secondary">
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoList;
