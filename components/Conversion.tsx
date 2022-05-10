import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useSmartEffect } from "../utils/useSmartEffect";
import { FC, useState } from "react";
import { Currencies } from "../types/currency";

export function Conversion({ currencies }: { currencies: Currencies }) {
  const [currency, setCurrency] = useState(Object.keys(currencies)[0]);
  const [czk, setCzk] = useState(0);
  const [amount, setAmount] = useState(0);
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
    <>
      <FormControl variant="standard">
        <TextField
          label="Amount of CZK"
          type="number"
          variant="standard"
          inputProps={{ min: 0, step: 1 }}
          value={czk}
          onChange={(e) => setCzk(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="start">CZK</InputAdornment>,
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
    </>
  );
}
