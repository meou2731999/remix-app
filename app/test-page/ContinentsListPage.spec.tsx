import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Index from "../routes/continents._index";
import { GET_ALL_CONTINENTS } from "~/graphql/queries";
import { mockDatContinents } from "~/components/continents/ContinentsListTable.spec";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter from react-router-dom

describe("Index", () => {
  const mocks = [
    {
      request: {
        query: GET_ALL_CONTINENTS,
      },
      result: {
        data: {
          continents: mockDatContinents,
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
        query: GET_ALL_CONTINENTS,
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

  it("renders ContinentsListTable component with fetched data", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText("Continents List Page")).toBeInTheDocument();
      expect(getByText("Asia")).toBeInTheDocument();
      expect(getByText("Europe")).toBeInTheDocument();
    });
  });
});
