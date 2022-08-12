import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import client from "../apollo-client";
import BlogCard from "../components/BlogCard";
import CreateArticle from "../components/CreateArticle";
import { FIRST_PAGE_QUERY } from "../queries/firstPageArticles";
import Switch from "@mui/material/Switch";
import { ThemeContext, themes } from "../theme-context";

export default function Home() {
  const [data, setdata] = useState<any>([]);
  const [darkTheme, setDarkTheme] = useState<any>(themes.light);
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
    if (darkTheme === themes.light) {
      setDarkTheme(themes.dark);
    } else {
      setDarkTheme(themes.light);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Article List</title>
        <meta name="description" content="test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeContext.Provider value={darkTheme}>
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
            <h1>Articles</h1>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <CreateArticle appendData={appendData} />
            </div>
            <div>
              <span>Dark Theme</span>
              <Switch
                checked={darkTheme.name === "dark" ? true : false}
                onChange={handleTheme}
              />
            </div>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.grid}>
            {data && (
              <BlogCard newData={newData} data={data.firstPageArticles || []} />
            )}
          </div>
        </main>
      </ThemeContext.Provider>
    </div>
  );
}
