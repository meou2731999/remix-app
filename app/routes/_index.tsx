import { useQuery } from "@apollo/client/react/hooks/useQuery";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react/dist/components";
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
    <div className="p-4 h-screen w-full flex justify-center items-center gap-4">
      <Link className="p-4 bg-gray-200 hover:bg-gray-400" to="/continents/">
        Continents List
      </Link>
      <Link className="p-4 bg-gray-200 hover:bg-gray-400" to="/countries/">
        Countries List
      </Link>
    </div>
  );
}
