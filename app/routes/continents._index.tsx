import { useQuery } from "@apollo/client/react/hooks/useQuery";
import type { MetaFunction } from "@remix-run/node";
import ContinentsListTable from "~/components/continents/ContinentsListTable";
import { GET_ALL_CONTINENTS } from "~/graphql/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Continents List Page" },
    { name: "description", content: "Query continents with remix and graphQL" },
  ];
};

export default function Index() {
  const { loading, error, data } = useQuery(GET_ALL_CONTINENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="p-4">
      <div className="text-lg font-bold">Continents List Page</div>
      <div className="mt-4">
        <ContinentsListTable data={data.continents} />
      </div>
    </div>
  );
}
