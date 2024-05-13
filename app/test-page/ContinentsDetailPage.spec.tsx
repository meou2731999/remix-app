import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import Index, { loader, meta } from "../routes/continents.$code";
import { GET_CONTINENT } from "~/graphql/queries";

jest.mock("@remix-run/react", () => ({
  ...jest.requireActual("@remix-run/react"), // Use the actual implementation for other exports
  useLoaderData: jest.fn().mockReturnValue("EU"), // Mock useLoaderData as a Jest mock function
}));

const mocks = [
  {
    request: {
      query: GET_CONTINENT,
      variables: { code: "EU" },
    },
    result: {
      data: {
        continent: {
          code: "EU",
          name: "Europe",
          countries: [
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
          ],
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
      { title: "Continent Detail Page" },
      {
        name: "description",
        content: "Query continent detail with remix and graphQL",
      },
    ]);
  });

  it("renders with loader return correct value", async () => {
    const loaderResult = await loader({
      params: { code: "AF" },
      request: new Request("http://app.com/path"),
      context: {},
    });

    expect(loaderResult).toEqual("AF");
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
        query: GET_CONTINENT,
        variables: { code: "EU" },
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

  it("renders continent details and countries list when data is loaded", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText("Continent Detail Page")).toBeInTheDocument();
      expect(getByText("Continent name: Europe")).toBeInTheDocument();
      expect(getByText("Continent code: EU")).toBeInTheDocument();
      expect(getByText("Countries List")).toBeInTheDocument();
      expect(getByText("France")).toBeInTheDocument();
    });
  });
});
