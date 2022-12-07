import Link from "next/link";
import Head from "next/head";

export default function FirstPost() {
  return (
    <div>
      <Head>
        <title></title>
      </Head>
      <h1>最初の投稿</h1>
      <Link href="/">ホームへ戻る</Link>
    </div>
  );
}
