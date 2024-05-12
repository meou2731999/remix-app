import { useQuery } from "@apollo/client/react/hooks/useQuery";
import type { MetaFunction } from "@remix-run/node";
import type { Country } from "~/graphql/__generated__/graphql";
import { GET_ALL_COUNTRIES } from "~/graphql/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Countries" },
    { name: "description", content: "Query countries with remix and graphQL" },
  ];
};

export default function Index() {
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="p-4">
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
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.countries.map((country: Country) => (
            <tr key={country.code}>
              <td className="border border-gray-300 px-4 py-2">
                {country.code}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {country.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {country.emoji}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {country.capital}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {country.continent.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {country.currencies.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {country.languages.map((item) => item.name).join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {country.phone}
              </td>
              {/* Add more cells for additional fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
