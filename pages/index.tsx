import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import client from "../apollo-client";
import BlogCard from "../components/BlogCard";
import CreateArticle from "../components/CreateArticle";
import { FIRST_PAGE_QUERY } from "../queries/firstPageArticles";

const Home: NextPage = () => {
  const [data, setdata] = useState<any>([]);
  const [newData, setNewData] = useState<any>({});
  useEffect(() => {
    async function getData() {
      const { data } = await client.query({ query: FIRST_PAGE_QUERY });
      console.log("data", data);
      setdata(data);
    }
    getData();
    return () => {};
  }, []);

  function appendData(newData: any) {
    setNewData(newData);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          {data && (
            <BlogCard newData={newData} data={data.firstPageArticles || []} />
          )}
        </div>
      </main>
      <CreateArticle appendData={appendData} />
      {/* <footer className={styles.footer}>
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
      </footer> */}
    </div>
  );
};

export default Home;
