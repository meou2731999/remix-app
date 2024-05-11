import { gql } from "@apollo/client/core";

// This query will only return the code, the name and the flag of the countries
export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      awsRegion
      capital
      code
      continent {
        name
        code
      }
      currencies
      currency
      emoji
      emojiU
      languages {
        name
        native
      }
      name
      native
      phone
      phones
      states {
        name
      }
      subdivisions {
        name
      }
    }
  }
`;
