import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import InfiniteScroll from "react-infinite-scroll-component";

export default function BlogCard(props: { data: any }) {
  const [posts, setPosts] = useState(props.data);
  const [hasMore, setHasMore] = useState(true);

  async function getMorePost() {
    const { data } = await client.query({
      query: gql`
        query {
          retrievePageArticles(page: 1) {
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
    setPosts([...posts, ...data.retrievePageArticles]);
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
          <div style={{ height: "50px" }} key={index}>
            {datum.id}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
