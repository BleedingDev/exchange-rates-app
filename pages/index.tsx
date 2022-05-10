import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { Conversion } from "../components/Conversion";
import { CurrencyTable } from "../components/CurrencyTable";
import { Currencies } from "../types/currency";

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
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign={["center"]}
          >
            Exchange rates
          </Typography>

          <Stack
            spacing={2}
            direction="row"
            width={"100%"}
            justifyContent="center"
            my={2}
          >
            <Button variant="contained" size="large">
              Refresh
            </Button>
          </Stack>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            textAlign={["center"]}
          >
            Converter
          </Typography>
          <Stack
            spacing={0}
            width="100%"
            justifyContent="center"
            sx={{ my: 2, flexDirection: { xs: "column", md: "row" } }}
          >
            <Conversion currencies={currencies} />
          </Stack>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          textAlign={["center"]}
        >
          Exchange rates table
        </Typography>
        <CurrencyTable currencies={currencies} />
      </Container>
    </>
  );
}
