import React from "react";
import { Link } from "@remix-run/react";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { GET_ALL_CONTINENTS } from "~/graphql/queries";
import { Continent } from "~/graphql/__generated__/graphql";

const ContinentsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_CONTINENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      <h1>Continents List</h1>
      <div className="p-4">
        <table className="border-collapse border border-gray-200 bg-white shadow-md">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Code</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Countries</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {data.continents.map((continent: Continent) => (
              <tr key={continent.code}>
                <td className="border border-gray-300 px-4 py-2">
                  {continent.code}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={continent.code}> {continent.name}</Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {continent.countries.map((item) => item.name).join(",")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContinentsList;
