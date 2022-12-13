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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableContainer: {
    marginTop: "20px",
  },
});

const TodoList = ({ todos, deleteTodo, findTodo }) => {
  const classes = useStyles();

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date.createdAt);
  };

  const handleDelete = (todoId) => {
    if (window.confirm("Yakin mau dihapus ?")) {
      deleteTodo(todoId);
      return;
    }
    return;
  };

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
          {todos.length ? (
            todos.map((row, i) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center">{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(row.createdAt)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.isDone ? "Done" : "In Progress"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => findTodo(row.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell align="center" colSpan={5}>
                Tidak ada Task
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoList;
