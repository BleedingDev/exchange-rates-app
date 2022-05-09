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
    exchangRate: number;
  };
}
const currencies: Currencies = {
  USD: {
    sign: "$",
    exchangRate: 25.5,
  },
  EUR: {
    sign: "€",
    exchangRate: 0.9,
  },
  GBP: {
    sign: "£",
    exchangRate: 0.8,
  },
  JPY: {
    sign: "¥",
    exchangRate: 110.5,
  },
  CAD: {
    sign: "C$",
    exchangRate: 1.3,
  },
  AUD: {
    sign: "A$",
    exchangRate: 1.4,
  },
};

export default function Index() {
  const [currency, setCurrency] = React.useState(Object.keys(currencies)[0]);
  const [czk, setCzk] = React.useState(0);
  const [amount, setAmount] = React.useState(0);

  useSmartEffect([
    {
      dependency: amount,
      callback: () => setCzk(amount / currencies[currency].exchangRate),
    },
    {
      dependency: czk,
      callback: () => setAmount(czk * currencies[currency].exchangRate),
    },
    {
      dependency: currency,
      callback: () => setAmount(czk * currencies[currency].exchangRate),
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
          direction="row"
          width={"100%"}
          justifyContent="center"
          sx={{ my: 5 }}
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

          <CompareArrowsIcon fontSize="large" sx={{ my: "1rem", mx: 4 }} />

          <FormControl variant="standard" sx={{ mx: 1 }}>
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
