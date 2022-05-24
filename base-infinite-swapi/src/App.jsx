import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";
//import { ReactQueryDevtools } from 'react-query/devtools'
import React from 'react'
function App() {
  const ClientQuery= new QueryClient()
  return (
    <QueryClientProvider  client={ClientQuery}  >
    <div className="App">
      <h1>Infinite SWAPI</h1>
      <InfinitePeople />
      {/* <InfiniteSpecies /> */}
    </div>

    </QueryClientProvider>
  );
}

export default App;
