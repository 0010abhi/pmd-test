import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import client from "../apollo-client";
import BlogCard from "../components/BlogCard";
import CreateArticle from "../components/CreateArticle";
import { FIRST_PAGE_QUERY } from "../queries/firstPageArticles";
import Switch from "@mui/material/Switch";

const Home: NextPage = () => {
  const [data, setdata] = useState<any>([]);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
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

  function handleTheme() {
    setDarkTheme(!darkTheme);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: "0px",
          background: "#FFF",
        }}
      >
        <div>
          <h2>Articles</h2>
        </div>
        <div>
          <span>Dark Theme</span>
          <Switch checked={darkTheme} onChange={handleTheme} />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.grid}>
          {data && (
            <BlogCard newData={newData} data={data.firstPageArticles || []} />
          )}
        </div>
      </main>
      <CreateArticle appendData={appendData} />
    </div>
  );
};

export default Home;
