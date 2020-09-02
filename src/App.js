import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "./apollo";
import JobList from "./components/JobList";

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <JobList />
    </ApolloProvider>
  );
}

export default App;
