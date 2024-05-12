import { render } from "@testing-library/react";
import ContinentsListTable from "../continents/ContinentsListTable";

describe("ContinentsListTable", () => {
  const mockData = [
    {
      code: "AF",
      name: "Africa",
      countries: [
        {
          name: "Country1",
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
          name: "Country2",
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
          name: "Country3",
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
          name: "Country4",
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

  it("renders table headers correctly", () => {
    const { getByText } = render(<ContinentsListTable data={[]} />);
    expect(getByText("Code")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Countries")).toBeInTheDocument();
  });

  it("renders continent data correctly", () => {
    const { getByText } = render(<ContinentsListTable data={mockData} />);
    expect(getByText("AF")).toBeInTheDocument();
    expect(getByText("Africa")).toBeInTheDocument();
    expect(getByText("Country1, Country2")).toBeInTheDocument();
    expect(getByText("AS")).toBeInTheDocument();
    expect(getByText("Asia")).toBeInTheDocument();
    expect(getByText("Country3, Country4")).toBeInTheDocument();
  });

  it("renders continent names as links", () => {
    const { getByText } = render(<ContinentsListTable data={mockData} />);
    expect(getByText("Africa")).toHaveAttribute("href", "/AF");
    expect(getByText("Asia")).toHaveAttribute("href", "/AS");
  });
});
