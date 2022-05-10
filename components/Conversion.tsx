import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useCallback, useEffect, useState } from "react";
import { Currencies } from "../types/currency";

export function Conversion({ currencies }: { currencies: Currencies }) {
  const [currency, setCurrency] = useState(Object.keys(currencies)[0]);
  const [czk, setCzk] = useState("0.00");
  const [amount, setAmount] = useState("0.00");
  const currCurrency = currencies?.[currency];
  const calcCzk = () =>
    currCurrency &&
    setCzk(
      (
        (Number(amount) * currCurrency.exchangeRate) /
        currCurrency.amount
      ).toFixed(2)
    );
  const calcForeign = useCallback(
    () =>
      currCurrency &&
      setAmount(
        (
          (Number(czk) / currCurrency.exchangeRate) *
          currCurrency.amount
        ).toFixed(2)
      ),
    [currCurrency, czk]
  );

  useEffect(() => {
    calcForeign();
  }, [calcForeign, currency]);

  // Previous solution to show custom hook
  /* useSmartEffect([
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
  ]); */

  return (
    <>
      <FormControl variant="standard">
        <TextField
          label="Amount of CZK"
          variant="standard"
          inputProps={{ min: 0, step: 1 }}
          value={czk}
          onChange={(e) => setCzk(e.target.value)}
          onBlur={calcForeign}
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
          variant="standard"
          inputProps={{ min: 0, step: 1 }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={calcCzk}
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
          onChange={(e) => {
            setCurrency(e.target.value);
            calcForeign();
          }}
        >
          {currencies &&
            Object.entries(currencies).map(([curr]) => (
              <MenuItem key={curr} value={curr}>
                {curr}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
