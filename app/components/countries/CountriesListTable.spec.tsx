import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CountriesListTable from "./CountriesListTable";
import type { Country } from "~/graphql/__generated__/graphql";

export const mockDataContries: Country[] = [
  {
    code: "FR",
    name: "France",
    emoji: "🇫🇷",
    capital: "Paris",
    continent: {
      code: "EU",
      name: "Europe",
      countries: [],
    },
    currencies: ["Euro"],
    languages: [
      {
        name: "French",
        code: "",
        native: "",
        rtl: false,
      },
    ],
    phone: "+33",
    awsRegion: "",
    emojiU: "",
    native: "",
    phones: [],
    states: [],
    subdivisions: [],
  },
  // Add more mock data as needed
];

describe("CountriesListTable", () => {
  it("renders the correct table structure", () => {
    const { container } = render(
      <MemoryRouter>
        <CountriesListTable data={mockDataContries} />
      </MemoryRouter>
    );

    // Assert the table structure
    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass(
      "border-collapse",
      "border",
      "border-gray-200",
      "bg-white",
      "shadow-md"
    );

    // Assert table headers
    expect(container.querySelectorAll("th")).toHaveLength(8); // Ensure there are 8 headers
    expect(container).toHaveTextContent("Code");
    expect(container).toHaveTextContent("Name");
    // Add more assertions for other headers
  });

  it("renders the correct number of rows and data", () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <CountriesListTable data={mockDataContries} />
      </MemoryRouter>
    );

    // Assert the data in each row
    mockDataContries.forEach((country) => {
      expect(getByText(country.code)).toBeInTheDocument();
      expect(getByText(country.name)).toBeInTheDocument();
      // Add more assertions for other columns
    });
  });

  it("renders links to navigate to country and continent details", () => {
    const { getByText } = render(
      <MemoryRouter>
        <CountriesListTable data={mockDataContries} />
      </MemoryRouter>
    );

    // Assert links to navigate to country details
    const franceLink = getByText("France");
    expect(franceLink).toBeInTheDocument();
    expect(franceLink).toHaveAttribute("href", "/countries/FR");

    // Assert links to navigate to continent details
    const europeLink = getByText("Europe");
    expect(europeLink).toBeInTheDocument();
    expect(europeLink).toHaveAttribute("href", "/continents/EU");
  });
});
