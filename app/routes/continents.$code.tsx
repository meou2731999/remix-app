import { useQuery } from "@apollo/client/react/hooks/useQuery";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CountriesListTable from "~/components/countries/CountriesListTable";
import type { Continent } from "~/graphql/__generated__/graphql";
import { GET_CONTINENT } from "~/graphql/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Continent Detail Page" },
    {
      name: "description",
      content: "Query continent detail with remix and graphQL",
    },
  ];
};

type Params = {
  code: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { code } = params as Params;
  return code;
};

export default function Index() {
  const code = useLoaderData<string>();
  const { loading, error, data } = useQuery(GET_CONTINENT, {
    variables: {
      code: code,
    },
    skip: !code,
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const continent: Continent = data.continent;

  return (
    <div className="p-4">
      <div className="text-lg font-bold">Continents Detail Page</div>
      <div className="mt-4">Continent name: {continent.name}</div>
      <div className="mt-4">Continent code: {continent.code}</div>
      <div className="mt-4">
        <div className="text-lg font-bold">Countries List</div>
        <CountriesListTable data={continent.countries} />
      </div>
    </div>
  );
}
