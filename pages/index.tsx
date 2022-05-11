import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack, useTheme } from "@mui/material";
import { Conversion } from "../components/Conversion";
import { CurrencyTable } from "../components/CurrencyTable";
import { Currencies } from "../types/currency";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";
import Copyright from "../components/Copyright";

const fetchFactory =
  (baseUrl = "") =>
  async () => {
    const response = await fetch(baseUrl + "/api/currencies");
    if (!response.ok) {
      throw new Error("Network request failed.");
    }
    return response.json();
  };

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // SSR fetch needs absolute URL
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("currencies", fetchFactory(baseUrl));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Index() {
  const theme = useTheme();

  const { data, error } = useQuery("currencies", fetchFactory());
  const currencies: Currencies = data?.data;

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
          >
            Exchange rates
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            textAlign="center"
          >
            Converter
          </Typography>
          <Stack
            spacing={0}
            width="100%"
            justifyContent="center"
            sx={{ my: 2, flexDirection: { xs: "column", md: "row" } }}
          >
            {error ? (
              <Typography
                variant="h4"
                component="h1"
                color={theme.palette.error.main}
                textAlign="center"
              >
                Failed to fetch data from ČNB, please try again in a few
                minutes.
              </Typography>
            ) : (
              <Conversion currencies={currencies} />
            )}
          </Stack>
        </Box>
      </Container>
      {!error && (
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            textAlign="center"
          >
            Exchange rates table
          </Typography>
          <CurrencyTable currencies={currencies} />
        </Container>
      )}
      <Copyright />
    </>
  );
}
