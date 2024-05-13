import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_COUNTRIES } from "~/graphql/queries";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter from react-router-dom
import Index from "../routes/countries._index";
import { mockDataContries } from "~/components/countries/CountriesListTable.spec";

describe("Index", () => {
  const mocks = [
    {
      request: {
        query: GET_ALL_COUNTRIES,
      },
      result: {
        data: {
          countries: mockDataContries,
        },
      },
    },
  ];

  it("renders loading state while fetching data", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message if an error occurs during data fetching", async () => {
    const errorMock = {
      request: {
        query: GET_ALL_COUNTRIES,
      },
      error: new Error("An error occurred"),
    };

    const { getByText } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText("Error : An error occurred")).toBeInTheDocument();
    });
  });

  it("renders CountriesListTable component with fetched data", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      mockDataContries.forEach(({ name }) => {
        expect(getByText(name)).toBeInTheDocument();
      });
    });
  });
});
