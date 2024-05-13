import { useQuery } from "@apollo/client/react/hooks/useQuery";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Country } from "~/graphql/__generated__/graphql";
import { GET_COUNTRY } from "~/graphql/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Country Detail Page" },
    {
      name: "description",
      content: "Query country detail with remix and graphQL",
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

  const country: Country = data.country;

  return (
    <div className="p-4">
      <div className="text-lg font-bold">Country Detail Page</div>
      <div className="mt-4">Country name: {country.name}</div>
      <div className="mt-4">Country code: {country.code}</div>
      <div className="mt-4">Country flag: {country.emoji}</div>
      <div className="mt-4">Country capital: {country.capital}</div>
      <div className="mt-4">
        Country continent:{" "}
        <Link
          className="hover:text-blue-500"
          to={"/continents/" + country.continent.code}
        >
          {country.continent.name}
        </Link>
      </div>
      <div className="mt-4">
        Country currencies: {country.currencies.join(", ")}
      </div>
      <div className="mt-4">
        Country languages:{" "}
        {country.languages
          .map((item: { name: string }) => item?.name)
          .join(", ")}
      </div>
      <div className="mt-4">Country phone: +{country.phone}</div>
    </div>
  );
}
