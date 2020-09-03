import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS } from "../queries/Jobs";
import { Card, Input, Button, Select } from "antd";
import styled from "styled-components";

const { Option } = Select;

const ListOfJobs = ({ jobs }) => {
  return jobs.map(({ id, title, city, company }) => (
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
};

const Job = ({ id, title, city, companyName, investors }) => {
  return (
    <Card key={id} title={title} bordered={true}>
      <p>City: {city}</p>
      <p>Company name: {companyName}</p>
      <p>Investors: {investors}</p>
    </Card>
  );
};

const InvestorSelect = ({ onSearch, investors, value }) => {
  const options = investors.map((e) => (
    <Option key={e.id} value={e.id}>
      {e.name}
    </Option>
  ));

  const onChange = (value) => {
    const el = {
      target: {
        name: "investors",
        value,
      },
    };
    onSearch(el);
  };

  return (
    <Select
      mode="tags"
      name="investors"
      value={value}
      placeholder="Please select one or more investors"
      defaultValue={[]}
      onChange={onChange}
      style={{ width: "100%" }}
    >
      {options}
    </Select>
  );
};

const CompanySelect = ({ onSearch, companies, value }) => {
  const options = companies.map((e) => (
    <Option key={e.id} value={e.id}>
      {e.name}
    </Option>
  ));

  const onChange = (value) => {
    const el = {
      target: {
        name: "companies",
        value,
      },
    };
    onSearch(el);
  };

  return (
    <Select
      mode="tags"
      name="companies"
      value={value}
      placeholder="Please select one or more companies"
      defaultValue={[]}
      onChange={onChange}
      style={{ width: "100%" }}
    >
      {options}
    </Select>
  );
};

const SearchBar = ({ onSearch, onReset, investors, companies, value }) => {
  return (
    <SearchContainer title="Search Filters">
      <Input
        name="title"
        addonBefore="Job Title"
        defaultValue=""
        onChange={onSearch}
      />
      <Input
        name="city"
        addonBefore="City"
        defaultValue=""
        onChange={onSearch}
      />
      <CompanySelect
        value={value.companies}
        onSearch={onSearch}
        companies={companies}
      />
      <InvestorSelect
        value={value.investors}
        onSearch={onSearch}
        investors={investors}
      />
      <Button type="text" danger onClick={onReset}>
        Remove Filters
      </Button>
    </SearchContainer>
  );
};

const filterData = (data, searchParams) => {
  const { city, title, companies, investors } = searchParams;

  function filterFunction(e) {
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

  return data.filter(filterFunction);
};

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
  console.log(searchParams);
  console.log(data);
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
        <ListOfJobs jobs={filteredJobs} />
      </GridComponent>
    </AppContainer>
  );
}

const SearchContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  max-width: 512px;
`;

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
