import { useNavigate } from "@remix-run/react";
import { Link } from "@remix-run/react/dist/components";
import React from "react";
import type { Country } from "~/graphql/__generated__/graphql";

type Prop = {
  data: Country[];
};

const CountriesListTable: React.FC<Prop> = ({ data }) => {
  return (
    <table className="border-collapse border border-gray-200 bg-white shadow-md">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Code</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Flag</th>
          <th className="border border-gray-300 px-4 py-2">Capital</th>
          <th className="border border-gray-300 px-4 py-2">Continent</th>
          <th className="border border-gray-300 px-4 py-2">Currencies</th>
          <th className="border border-gray-300 px-4 py-2">Languages</th>
          <th className="border border-gray-300 px-4 py-2">Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.map((country) => (
          <tr key={country.code}>
            <td className="border border-gray-300 px-4 py-2">{country.code}</td>
            <td className="border border-gray-300 px-4 py-2">
              <Link to={"/countries/" + country.code}>{country.name}</Link>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {country.emoji}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {country.capital}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <Link to={"/continents/" + country.continent.code}>
                {country.continent.name}
              </Link>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {country.currencies.join(", ")}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {country.languages.map((item) => item?.name).join(", ")}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {country.phone}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountriesListTable;
