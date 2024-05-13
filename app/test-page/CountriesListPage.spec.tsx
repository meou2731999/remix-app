import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_COUNTRIES } from "~/graphql/queries";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter from react-router-dom
import Index, { meta } from "../routes/countries._index";
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

  it("returns correct metadata", () => {
    const metaData = meta({
      data: undefined,
      params: {},
      location: {
        state: undefined,
        key: "",
        pathname: "",
        search: "",
        hash: "",
      },
      matches: [],
    });

    // Assert your expectations
    expect(metaData).toEqual([
      { title: "Countries List Page" },
      {
        name: "description",
        content: "Query countries with remix and graphQL",
      },
    ]);
  });

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
      expect(getByText("Countries List Page")).toBeInTheDocument();
      mockDataContries.forEach(({ name }) => {
        expect(getByText(name)).toBeInTheDocument();
      });
    });
  });
});
