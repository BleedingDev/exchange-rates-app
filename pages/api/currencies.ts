import type { NextApiRequest, NextApiResponse } from "next";
import {
  Currencies,
  Currency,
  CurrencyApiResponse,
  Description,
  Metadata,
} from "../../types/currency";

function parseData(data: string): Metadata | null {
  if (data.includes("#")) {
    const [date, iteration] = data.split(" #");
    return {
      date,
      iteration,
    };
  }

  return null;
}

function parseDescription(description: string): Description | null {
  const [country, currency, amount, code, exchangeRate] =
    description.split("|");
  const decodedAmount = Number(amount);
  const decodedRate = Number(exchangeRate?.replace(",", "."));

  if (isNaN(decodedAmount) || isNaN(decodedRate)) {
    return {
      country,
      currency,
      amount,
      code,
      exchangeRate,
    };
  }

  return null;
}

function parseCurrency(line: string): Currency {
  const [country, currency, amount, code, exchangeRate] = line.split("|");

  return {
    country,
    currency,
    amount: Number(amount),
    code,
    exchangeRate: Number(exchangeRate?.replace(",", ".")),
  };
}

const currenciesRequest = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const currencies = await fetch(
      "http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt"
    );
    const currenciesData = await currencies.text();
    const [meta, desc, ...rest] = currenciesData.split("\n");
    const response: CurrencyApiResponse = {
      metadata: {
        ...parseData(meta),
        columnDescription: parseDescription(desc),
      },
      data: rest
        .filter(Boolean)
        .map(parseCurrency)
        .sort((a, b) => a.code.localeCompare(b.code))
        .reduce(
          (acc, curr) => ({
            ...acc,
            [curr.code]: curr,
          }),
          {} as Currencies
        ),
    };

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default currenciesRequest;
