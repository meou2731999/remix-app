import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import Index, { loader, meta } from "../routes/countries.$code";
import { GET_CONTINENT, GET_COUNTRY } from "~/graphql/queries";

jest.mock("@remix-run/react", () => ({
  ...jest.requireActual("@remix-run/react"), // Use the actual implementation for other exports
  useLoaderData: jest.fn().mockReturnValue("FR"), // Mock useLoaderData as a Jest mock function
}));

const mocks = [
  {
    request: {
      query: GET_COUNTRY,
      variables: { code: "FR" },
    },
    result: {
      data: {
        country: {
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
          phone: "33",
          awsRegion: "",
          emojiU: "",
          native: "",
          phones: [],
          states: [],
          subdivisions: [],
        },
      },
    },
  },
];

describe("Index", () => {
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
      { title: "Country Detail Page" },
      {
        name: "description",
        content: "Query country detail with remix and graphQL",
      },
    ]);
  });

  it("renders with loader return correct value", async () => {
    const loaderResult = await loader({
      params: { code: "SG" },
      request: new Request("http://app.com/path"),
      context: {},
    });

    expect(loaderResult).toEqual("SG");
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
        query: GET_COUNTRY,
        variables: { code: "FR" },
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

  it("renders country details and countries list when data is loaded", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText("Country Detail Page")).toBeInTheDocument();
      expect(getByText("Country name: France")).toBeInTheDocument();
      expect(getByText("Country code: FR")).toBeInTheDocument();
      expect(getByText("Country flag: 🇫🇷")).toBeInTheDocument();
      expect(getByText("Country capital: Paris")).toBeInTheDocument();
      expect(getByText("Country continent:")).toBeInTheDocument();
      expect(getByText("Europe")).toHaveAttribute("href", "/continents/EU");
      expect(getByText("Country currencies: Euro")).toBeInTheDocument();
      expect(getByText("Country languages: French")).toBeInTheDocument();
      expect(getByText("Country phone: +33")).toBeInTheDocument();
    });
  });
});
