import { fireEvent, render, waitFor } from "@testing-library/react";
import ContinentsListTable from "./ContinentsListTable";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter from react-router-dom
import type { Continent } from "~/graphql/__generated__/graphql";

// Mock data
export const mockDatContinents: Continent[] = [
  {
    code: "EU",
    name: "Europe",
    countries: [
      {
        name: "France",
        awsRegion: "",
        code: "",
        continent: {
          __typename: undefined,
          code: "",
          countries: [],
          name: "",
        },
        currencies: [],
        emoji: "",
        emojiU: "",
        languages: [],
        native: "",
        phone: "",
        phones: [],
        states: [],
        subdivisions: [],
      },
      {
        name: "Germany",
        awsRegion: "",
        code: "",
        continent: {
          __typename: undefined,
          code: "",
          countries: [],
          name: "",
        },
        currencies: [],
        emoji: "",
        emojiU: "",
        languages: [],
        native: "",
        phone: "",
        phones: [],
        states: [],
        subdivisions: [],
      },
    ],
  },
  {
    code: "AS",
    name: "Asia",
    countries: [
      {
        name: "China",
        awsRegion: "",
        code: "",
        continent: {
          __typename: undefined,
          code: "",
          countries: [],
          name: "",
        },
        currencies: [],
        emoji: "",
        emojiU: "",
        languages: [],
        native: "",
        phone: "",
        phones: [],
        states: [],
        subdivisions: [],
      },
      {
        name: "India",
        awsRegion: "",
        code: "",
        continent: {
          __typename: undefined,
          code: "",
          countries: [],
          name: "",
        },
        currencies: [],
        emoji: "",
        emojiU: "",
        languages: [],
        native: "",
        phone: "",
        phones: [],
        states: [],
        subdivisions: [],
      },
    ],
  },
];

describe("ContinentsListTable", () => {
  it("Renders table headers and data correctly", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <ContinentsListTable data={mockDatContinents} />
      </MemoryRouter>
    );

    // Check if table headers are rendered
    expect(getByText("Code")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Countries")).toBeInTheDocument();

    // Check if continent data is rendered
    mockDatContinents.forEach(async (continent) => {
      expect(getByText(continent.code)).toBeInTheDocument();
      expect(getByText(continent.name)).toBeInTheDocument();
      expect(
        getByText(continent.countries.map((country) => country.name).join(","))
      ).toBeInTheDocument();
      expect(getByText(continent.name)).toHaveAttribute(
        "href",
        "/" + continent.code
      );
    });
  });
});
