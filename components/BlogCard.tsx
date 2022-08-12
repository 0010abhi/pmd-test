import { useState } from "react";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import InfiniteScroll from "react-infinite-scroll-component";
import URLImage from "./URLImage";

export default function BlogCard(props: { data: any }) {
  const [posts, setPosts] = useState(props.data);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  async function getMorePost() {
    const { data } = await client.query({
      query: gql`
        query {
          retrievePageArticles(page: ${pageNumber}) {
            id
            author
            createdAt
            score
            updatedAt
            title
            text
            type
            url
          }
        }
      `,
    });
    console.log("data", data);
    console.log("hitting for page", pageNumber + 1);
    if (data.retrievePageArticles.length > 0) {
      setPageNumber(pageNumber + 1);
      setPosts([...posts, ...data.retrievePageArticles]);
    } else {
      setHasMore(false);
    }
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {(posts || []).map((datum: any, index: number) => (
          <div id={datum.id} style={{ height: "50px" }} key={index}>
            {datum.author}
            {datum.createdAt}
            {datum.score}
            {datum.updatedAt}
            {datum.title}
            {datum.text}
            {datum.type}
            {/* <URLImage url={datum.url} /> */}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
