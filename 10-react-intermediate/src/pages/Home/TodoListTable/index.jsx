import React, { useContext } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  styled,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TableBody,
  Button,
  CircularProgress,
  Box,
  TableFooter,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { UserContext } from "../../../contexts/UserContext";
import MuiLink from "../../../components/MuiLink";
import TablePagination from "./TablePagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const formatDate = (date) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })
    .format(newDate)
    .split(",")
    .join(" ");
};
const TodoListTable = () => {
  const { data, selectedUser } = useContext(UserContext);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUser = (userId) => {
    return data.find((user) => user.id === userId)?.username;
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Author</StyledTableCell>
                <StyledTableCell align="left">Created At</StyledTableCell>
                <StyledTableCell align="left">Last Modified</StyledTableCell>
                <StyledTableCell align="center">Published</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? posts.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : posts
              ).map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                    <MuiLink path={`posts/${row.id}`}>{row.title}</MuiLink>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {getUser(row.authorId)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatDate(row.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatDate(row.lastModified)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.published ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {selectedUser?.id === row.authorId ? (
                      <>
                        <Button size="small" color="warning" variant="outlined">
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          sx={{ marginLeft: "10px" }}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <span>Not Allowed</span>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  posts={posts}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TodoListTable;
