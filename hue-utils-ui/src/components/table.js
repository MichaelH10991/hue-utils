import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Brand&nbsp;</TableCell>
            <TableCell align="right">Ammount&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData.map(
            (day, index) =>
              index === props.value &&
              day[Object.keys(day)[0]].map((row) => {
                console.log(row.name);
                return (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.brand}</TableCell>
                    <TableCell align="right">{row.ammount}</TableCell>
                  </TableRow>
                );
              })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
