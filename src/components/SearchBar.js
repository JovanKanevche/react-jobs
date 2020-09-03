import React from "react";
import { Input, Button, Select, Card } from "antd";
import styled from "styled-components";

const { Option } = Select;

export default function SearchBar({
  onSearch,
  onReset,
  investors,
  companies,
  value,
}) {
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
}

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

const SearchContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  max-width: 512px;
`;
