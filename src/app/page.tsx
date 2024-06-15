import { PrimaryHeadline } from "@/components/headline/PrimaryHeadline";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <PrimaryHeadline lang="jp" tag="h1">
        日本語
      </PrimaryHeadline>
      <PrimaryHeadline lang="en" tag="h1">
        Pome
      </PrimaryHeadline>
      <p className="font-jp">日本語</p>
      <p className="font-en">dposafidpsafj</p>
    </div>
  );
}
