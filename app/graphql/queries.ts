import { gql } from "@apollo/client";

// This query will only return the code, the name and the flag of the countries
export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      name
      emoji
    }
  }
`;
