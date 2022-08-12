import { useState, useEffect } from "react";
import Image from "next/image";
const urlMetadata = require("url-metadata");

export default function URLImage(props: { url: string }) {
  useEffect(() => {
    async function getUrlMetadata() {
      try {
        const metadata = await urlMetadata(props.url);
        console.log("metadata", metadata);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return <div></div>;
}
