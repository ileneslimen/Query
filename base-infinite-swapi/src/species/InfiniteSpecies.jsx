import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import React from 'react'
import {useInfiniteQuery} from 'react-query'
const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {data, hasNextPage,fetchNextPage, isLoading }= useInfiniteQuery('species', ({pageParam=initialUrl})=> fetchUrl(pageParam) , 
  {getNextPageParam: lastPage=> lastPage.next||undefined })

  if (isLoading) return <h3>loading</h3>
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll  loadMore={fetchNextPage} hasMore={hasNextPage}  >
    {data.pages.map(el=> el.results.map(el=> <Species key={el.name} name={el.name} language={el.language} ></Species>))}
  </InfiniteScroll>;
}
