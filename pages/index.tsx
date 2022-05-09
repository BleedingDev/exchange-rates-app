import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useSmartEffect } from "../utils/useSmartEffect";

interface Currencies {
  [key: string]: {
    sign: string;
    exchangeRate: number;
    amount: number;
  };
}
const currencies: Currencies = {
  USD: {
    sign: "$",
    exchangeRate: 25.5,
    amount: 1,
  },
  EUR: {
    sign: "€",
    exchangeRate: 0.9,
    amount: 1,
  },
  GBP: {
    sign: "£",
    exchangeRate: 0.8,
    amount: 1,
  },
  JPY: {
    sign: "¥",
    exchangeRate: 17.888,
    amount: 100,
  },
  CAD: {
    sign: "C$",
    exchangeRate: 1.3,
    amount: 1,
  },
  AUD: {
    sign: "A$",
    exchangeRate: 1.4,
    amount: 1,
  },
};

export default function Index() {
  const [currency, setCurrency] = React.useState(Object.keys(currencies)[0]);
  const [czk, setCzk] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const currCurrency = currencies[currency];
  const calcCzk = () =>
    setCzk((amount / currCurrency.exchangeRate) * currCurrency.amount);
  const calcForeign = () =>
    setAmount((czk * currCurrency.exchangeRate) / currCurrency.amount);

  useSmartEffect([
    {
      dependency: amount,
      callback: calcCzk,
    },
    {
      dependency: czk,
      callback: calcForeign,
    },
    {
      dependency: currency,
      callback: calcForeign,
    },
  ]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign={["center"]}
        >
          Exchange rates for currencies
        </Typography>
        <Stack
          spacing={2}
          direction="row"
          width={"100%"}
          justifyContent="center"
        >
          <Button variant="contained" size="large">
            Refresh
          </Button>
        </Stack>
        <Stack
          spacing={0}
          width="100%"
          justifyContent="center"
          sx={{ my: 5, flexDirection: { xs: "column", md: "row" } }}
        >
          <FormControl variant="standard">
            <TextField
              label="Amount of CZK"
              type="number"
              variant="standard"
              inputProps={{ min: 0, step: 1 }}
              value={czk}
              onChange={(e) => setCzk(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">CZK</InputAdornment>
                ),
              }}
            />
          </FormControl>

          <CompareArrowsIcon
            fontSize="large"
            sx={{
              my: 1,
              mx: { xs: "auto", md: "1rem" },
            }}
          />

          <FormControl
            variant="standard"
            sx={{ mx: { xs: 0, md: 1 }, my: { xs: 1, md: 0 } }}
          >
            <TextField
              label={`Amount of ${currency}`}
              type="number"
              variant="standard"
              inputProps={{ min: 0, step: 1 }}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">{currency}</InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {Object.entries(currencies).map(([curr, { sign }]) => (
                <MenuItem key={curr} value={curr}>
                  {sign} - {curr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </Container>
  );
}
