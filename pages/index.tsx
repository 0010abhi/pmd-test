import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import BlogCard from "../components/BlogCard";
import CreateArticle from "../components/CreateArticle";

const Home: NextPage = () => {
  const [data, setdata] = useState<any>([]);
  useEffect(() => {
    async function getData() {
      const { data } = await client.query({
        query: gql`
          query {
            firstPageArticles {
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
      setdata(data);
    }
    getData();
    return () => {};
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          {data && <BlogCard data={data.firstPageArticles || []} />}
        </div>
        <CreateArticle />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  ).then((response) => response.json());
  return {
    props: { data }
  };
};

export default Home;
