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

export const GET_ALL_CONTINENTS = gql`
  query GetAllContinents {
    continents {
      code
      countries {
        name
        code
      }
      name
    }
  }
`;

export const GET_CONTINENT = gql`
  query GetContinent($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        awsRegion
        capital
        code
        currencies
        emoji
        emojiU
        continent {
          name
          code
        }
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
  }
`;

export const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      awsRegion
      capital
      code
      continent {
        name
        code
      }
      currencies
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
