import Image from "next/image";
import { useUrlasImage } from "../hooks/useUrlasImage";

export default function URLImage(props: { url: string }) {
  const img = useUrlasImage(props.url);
  console.log("image url hook", img);

  return (
    <div>
      {img && <Image src={img} alt="Test" width={1200} height={240} />}
    </div>
  );
}
