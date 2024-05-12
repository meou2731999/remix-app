import React from "react";
import { Link } from "@remix-run/react";
import { Continent } from "~/graphql/__generated__/graphql";

type Prop = {
  data: Continent[];
};

const ContinentsListTable: React.FC<Prop> = ({ data }) => {
  return (
    <div className="p-4">
      <h1>Continents List</h1>
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
          {data.map((continent: Continent) => (
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
  );
};

export default ContinentsListTable;
