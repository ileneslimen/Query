import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import React from 'react'
import {useInfiniteQuery} from 'react-query'
const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {

  const {data, fetchNextPage, hasNextPage, isLoading, isFetching}= useInfiniteQuery('people',  
  ({pageParam=initialUrl})=> fetchUrl(pageParam) ,
  {getNextPageParam: lastPage=> lastPage.next || undefined} )

  if(isLoading) return <h3>looading..</h3>
  console.log(data.pages)
  // TODO: get data for InfiniteScroll via React Query
  return(
  <>
  {isFetching && <h3>loading</h3>}
  <InfiniteScroll  loadMore={fetchNextPage} hasMore={hasNextPage} >
  {data.pages.map(el=> el.results.map(el=> <Person key={el.name}  eyeColor={el.eye_color} hairColor={el.hair_color}  name={el.name}></Person>)
  )} 

  </InfiniteScroll>
  </>)
}
