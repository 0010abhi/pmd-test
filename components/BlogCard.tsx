import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "../styles/Home.module.css";
import { ThemeContext } from "../theme-context";
import URLImage from "./URLImage";

export default function BlogCard(props: { data: any; newData: any }) {
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

  useEffect(() => {
    console.log("props.newData", props.newData);
    if (Object.keys(props.newData).length > 0) {
      const data = props.newData;
      setPosts([...[data], ...posts]);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [props.newData]);

  return (
    <ThemeContext.Consumer>
      {({ cardColor }) => (
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePost}
          hasMore={hasMore}
          loader={<h3> Loading...</h3>}
          endMessage={<h4>Nothing more to show</h4>}
          style={{ backgroundColor: cardColor }}
        >
          {(posts || []).map((datum: any, index: number) => (
            <Card
              className={styles.blogCard}
              style={{ marginBottom: "25px", backgroundColor: "#fff" }}
              // id={datum.id}
              key={index}
              // sx={{ maxWidth: 345 }}
            >
              {datum.url ? (
                <URLImage url={datum.url} />
              ) : (
                <CardMedia
                  component="img"
                  height="240"
                  image="/images/pmd-test-card.png"
                  alt="test card image"
                />
              )}

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {datum.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {datum.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </InfiniteScroll>
      )}
    </ThemeContext.Consumer>
  );
}
