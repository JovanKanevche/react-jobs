import { gql } from "apollo-boost";

const QUERY_JOBS = gql`
  query fetchInvestors {
    investors {
      name
      id
    }
  }
`;

export { QUERY_JOBS };
