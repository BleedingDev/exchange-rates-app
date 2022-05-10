import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { Conversion } from "../components/Conversion";
import { CurrencyTable } from "../components/CurrencyTable";
import { Currencies } from "../types/currency";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("currencies", () =>
    fetch(baseUrl + "/api/currencies").then((r) => r.json())
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Index() {
  const currencies: Currencies = useQuery("currencies", () =>
    fetch("/api/currencies").then((r) => r.json())
  )?.data?.data;

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign={"center"}
          >
            Exchange rates
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            textAlign={"center"}
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
          textAlign={"center"}
        >
          Exchange rates table
        </Typography>
        <CurrencyTable currencies={currencies} />
      </Container>
    </>
  );
}
