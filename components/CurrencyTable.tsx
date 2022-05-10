import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Currencies } from "../types/currency";

function normalizeCurrencies(currencies: Currencies) {
  return Object.entries(currencies).map(([key, value]) => ({
    name: key,
    amount: value.amount,
    exchangeRate: value.exchangeRate,
  }));
}
type RowData = ReturnType<typeof normalizeCurrencies>;

function CurrencyTableBody({ data, left }: { data: RowData; left: boolean }) {
  const theme = useTheme();

  return (
    <Table
      sx={{
        maxWidth: { xs: "100%", md: "50%" },
        float: left ? "left" : "right",
        borderRight: {
          md: left ? `2px solid ${theme.palette.secondary.dark}` : "none",
          xs: "none",
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell align="center">Currency</TableCell>
          <TableCell align="center">Amount</TableCell>
          <TableCell align="center">Exchange rate</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="center" component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="center">{row.amount}</TableCell>
            <TableCell align="center">{row.exchangeRate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function CurrencyTable({ currencies }: { currencies: Currencies }) {
  const rows = normalizeCurrencies(currencies);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [leftData, rightData] = matches
    ? [rows.slice(0, rows.length / 2), rows.slice(rows.length / 2, rows.length)]
    : [rows];

  return (
    <TableContainer
      aria-label="Currency table"
      component={Paper}
      sx={{ minWidth: { xs: undefined, md: 850 } }}
    >
      <CurrencyTableBody data={leftData} left={true} />
      {rightData && <CurrencyTableBody data={rightData} left={false} />}
    </TableContainer>
  );
}
