import { useQuery } from "@apollo/client/react/hooks/useQuery";
import type { MetaFunction } from "@remix-run/node";
import CountriesListTable from "~/components/countries/CountriesListTable";
import { GET_ALL_COUNTRIES } from "~/graphql/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Countries List Page" },
    { name: "description", content: "Query countries with remix and graphQL" },
  ];
};

export default function Index() {
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="p-4">
      <div className="text-lg font-bold">Countries List Page</div>
      <div className="mt-4">
        <CountriesListTable data={data.countries} />
      </div>
    </div>
  );
}
