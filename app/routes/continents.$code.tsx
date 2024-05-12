import { useQuery } from "@apollo/client/react/hooks/useQuery";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CountriesListTable from "~/components/countries/CountriesListTable";
import { GET_CONTINENT } from "~/graphql/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Continents" },
    { name: "description", content: "Query continents with remix and graphQL" },
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
  return (
    <div className="p-4">
      <div>Continent name: {data.continent.name}</div>
      <div className="pt-4">Continent code: {data.continent.code}</div>
      <CountriesListTable data={data.continent.countries} />
    </div>
  );
}
