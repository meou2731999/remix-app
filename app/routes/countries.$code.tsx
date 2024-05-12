import { useQuery } from "@apollo/client/react/hooks/useQuery";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CountriesListTable from "~/components/countries/CountriesListTable";
import type { Country } from "~/graphql/__generated__/graphql";
import { GET_COUNTRY } from "~/graphql/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Country" },
    {
      name: "description",
      content: "Query Country detail with remix and graphQL",
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
  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: {
      code: code,
    },
    skip: !code,
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="p-4">
      <div>Country name: {data.country.name}</div>
      <div className="pt-4">Country code: {data.country.code}</div>
      <div className="pt-4">Country flag: {data.country.emoji}</div>
    </div>
  );
}
