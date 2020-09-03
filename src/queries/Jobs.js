import { gql } from "apollo-boost";

const QUERY_JOBS = gql`
  query fetchJobs {
    jobs {
      id
      title
      city
      company {
        company_investors {
          investor {
            id
            name
          }
          investor_id
        }
        id
        name
      }
    }
    investors {
      name
      id
    }
    companies {
      id
      name
    }
  }
`;

export { QUERY_JOBS };
