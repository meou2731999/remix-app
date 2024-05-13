import { useNavigate } from "@remix-run/react";
import { Link } from "@remix-run/react/dist/components";
import React from "react";
import type { Country } from "~/graphql/__generated__/graphql";

type Prop = {
  data: Country[];
};

const tableHeaderStyle = "border border-gray-300 px-4 py-2 bg-gray-100";
const tableBodyStyle = "border border-gray-300 px-4 py-2";

const CountriesListTable: React.FC<Prop> = ({ data }) => {
  return (
    <table className="border-collapse border border-gray-200 bg-white shadow-md">
      <thead>
        <tr>
          <th className={tableHeaderStyle}>Code</th>
          <th className={tableHeaderStyle}>Name</th>
          <th className={tableHeaderStyle}>Flag</th>
          <th className={tableHeaderStyle}>Capital</th>
          <th className={tableHeaderStyle}>Continent</th>
          <th className={tableHeaderStyle}>Currencies</th>
          <th className={tableHeaderStyle}>Languages</th>
          <th className={tableHeaderStyle}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.map((country) => (
          <tr key={country.code}>
            <td className={tableBodyStyle}>{country.code}</td>
            <td className={tableBodyStyle}>
              <Link to={"/countries/" + country.code}>{country.name}</Link>
            </td>
            <td className={tableBodyStyle}>{country.emoji}</td>
            <td className={tableBodyStyle}>{country.capital}</td>
            <td className={tableBodyStyle}>
              <Link to={"/continents/" + country.continent.code}>
                {country.continent.name}
              </Link>
            </td>
            <td className={tableBodyStyle}>{country.currencies.join(", ")}</td>
            <td className={tableBodyStyle}>
              {country.languages.map((item) => item?.name).join(", ")}
            </td>
            <td className={tableBodyStyle}>{country.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountriesListTable;
