import { useState, useEffect } from "react";
import Image from "next/image";
const urlMetadata = require("url-metadata");
// const getMetaData = require('metadata-scraper')

export default function URLImage(props: { url: string }) {
  useEffect(() => {
    function getUrlMetadata() {
      urlMetadata(props.url)
        .then(
          (sucRes: any) => {
            console.log("sucRes", sucRes.image);
          },
          (errRes: any) => {
            console.log("errRes", errRes);
          }
        )
        .catch((error: any) => {
          console.log("error", error);
        });
    }
    getUrlMetadata();
  }, []);

  return <div></div>;
}
