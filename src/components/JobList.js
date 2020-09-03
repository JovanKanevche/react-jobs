import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS } from "../queries/Jobs";
import { Card } from "antd";
import styled from "styled-components";
import SearchBar from "./SearchBar";

function JobList() {
  const INITIAL_SEARCH_STATE = {
    title: "",
    city: "",
    companies: [],
    investors: [],
  };
  const [searchParams, setSearchParams] = useState(INITIAL_SEARCH_STATE);
  const { loading, error, data } = useQuery(QUERY_JOBS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const filterData = (data, searchParams) => {
    const { city, title, companies, investors } = searchParams;

    function predicateFunction(e) {
      return (
        e.city.includes(city) &&
        e.title.includes(title) &&
        (investors.length === 0 ||
          e.company.company_investors.some((e) =>
            investors.includes(e.investor.id)
          )) &&
        (companies.length === 0 || companies.includes(e.company.id))
      );
    }

    return data.filter(predicateFunction);
  };

  const filteredJobs = filterData(data.jobs, searchParams);

  function onSearch(el) {
    const value = el.target.value;
    const name = el.target.name;

    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  }

  function onReset() {
    setSearchParams(INITIAL_SEARCH_STATE);
  }

  return (
    <AppContainer>
      <SearchBar
        value={searchParams}
        onSearch={onSearch}
        onReset={onReset}
        investors={data.investors}
        companies={data.companies}
      />
      <GridComponent>
        <JobsContainer jobs={filteredJobs} />
      </GridComponent>
    </AppContainer>
  );
}

const JobsContainer = ({ jobs }) =>
  jobs.map(({ id, title, city, company }) => (
    <Job
      key={id}
      id={id}
      title={title}
      companyName={company.name}
      com
      city={city}
      investors={company.company_investors
        .map((e) => e.investor.name)
        .join(", ")}
    />
  ));

const Job = ({ id, title, city, companyName, investors }) => (
  <Card key={id} title={title} bordered={true}>
    <p>City: {city}</p>
    <p>Company name: {companyName}</p>
    <p>Investors: {investors}</p>
  </Card>
);

const GridComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr));
  max-width: 1024px;
`;

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default JobList;
