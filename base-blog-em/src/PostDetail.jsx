import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const deleteMutation= useMutation((postID)=>deletePost(postID))

  const updateMutation=useMutation((postId)=>updatePost(postId))
  // replace with useQuery
  const {data, isLoading, isError, error} = useQuery(['comments', post.id], ()=>fetchComments(post.id));
if (isLoading) return <h3>loading...</h3>
if (isError) return <div>
  opps something went wrong <span>{error.toString()}</span>
</div>


  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button   onClick={()=>deleteMutation.mutate(post.id)}  >Delete</button> <button onClick={()=>updateMutation.mutate(post.id)}  >Update title</button>
      {deleteMutation.isError && <h3  style={{color:"red"}} >could not delete post</h3>}
      {deleteMutation.isLoading && <h3  style={{color:"pink"}} >Loading....</h3>}
      {deleteMutation.isSuccess && <h3  style={{color:"green"}}  >post has not been deleted.</h3>}
      {updateMutation.isError && <h3  style={{color:"red"}} >could not update post</h3>}
      {updateMutation.isLoading && <h3  style={{color:"pink"}} >Loading....</h3>}
      {updateMutation.isSuccess && <h3  style={{color:"green"}}  >post has not been updated.</h3>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
