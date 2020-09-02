import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS } from "../queries/Jobs";
import { Card } from "antd";
import styled from "styled-components";

const Job = ({ id, title, city, investors }) => {
  return (
    <Card key={id} title={title} bordered={true}>
      <p>{city}</p>
      <p>{investors}</p>
    </Card>
  );
};

function JobList(props) {
  const { loading, error, data } = useQuery(QUERY_JOBS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <AppContainer>
      <GridComponent>
        {data.jobs.map(({ id, title, city }) => (
          <Job key={id} id={id} title={title} city={city} investors="" />
        ))}
      </GridComponent>
    </AppContainer>
  );
}

const GridComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  max-width: 1024px;
`;

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default JobList;
