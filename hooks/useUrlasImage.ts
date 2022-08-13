import { useState, useEffect } from "react";
import { toPng } from "html-to-image";

export function useUrlasImage(url: string) {
  const [img, setImg] = useState<any>(null);

  // function getMeta(metaName: any, el: any) {
  //   const metas = el.getElementsByTagName('meta');
  //   console.log('metas', metas);
  //   for (let i = 0; i < metas.length; i++) {
  //     console.log(metas[i].getAttribute('property'),metaName)
  //     if (metas[i].getAttribute('property') === metaName) {
  //       return metas[i].getAttribute('content');
  //     }
  //   }

  //   return '';
  // }

  useEffect(() => {
    fetch(
      `https://api.scraperapi.com?api_key=4a24e6205a16e1898485824b97555e23&url=${url}`
    )
      .then((response) => {
        console.log("response", response);
        return response.text();
      })
      .then(
        (sucRes: any) => {
          console.log("sucRes", sucRes);
          var el = document.createElement("html");
          el.innerHTML = sucRes;
          // const imgUrl = getMeta('og:image', el);
          // console.log("sucRes el image", imgUrl);
          toPng(el, { width: 1200, height: 1200 })
            .then((dataUrl: any) => {
              console.log("dataUrl", img);
              setImg(dataUrl);
            })
            .catch((error: any) => {
              console.error("oops, something went wrong!", error);
            });
        },
        (errRes: any) => {
          console.log("errRes", errRes);
        }
      )
      .catch((error: any) => {
        console.log("error", error);
      });
  }, []);

  return img;
}
