import { NextPage } from "next"
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import utilStyle from "../styles/utils.module.css"
import Layout, { siteTitle } from '../components/Layout'
import { getPostsData } from "../lib/post";
import type { AllPostsData } from "../lib/post"

// SSG（Static Site Generator, 静的生成）の場合
// Next.jsでお決まりの静的生成の関数
export async function getStaticProps() {
  const allPostsData: AllPostsData[] = getPostsData(); // id, title, date, thumbnail
  console.log(allPostsData);
  return {
    props: {
      allPostsData
    }
  }
}

// SSR（Server Side Rendering）の場合
// export async function getServerSideProps(context: any) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     }
//   }
// }

// Layoutコンポーネントで囲んだテンプレートは、
// Layoutのpropsにchildrenとして渡される
// Layoutで挟んだコンポーネントのpropsには、渡されない模様

// Home({allPostsData}) これは分割代入引数を使った構文で、
// const allPostsData: AllPostsData = value が
// 自動的に関数のスコープで定義される
// 分割代入引数の型注釈の書き方はコードの実例を参考
export default function Home({ allPostsData }: { allPostsData: AllPostsData[] }) {
  console.log(allPostsData);
  return (
    <Layout>
      <noscript>このサイトを表示するにはJavaScriptを有効にしてください</noscript>

      <section className={utilStyle.headingMd}>
        <p>Lorem ipsam</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  alt=""
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <p className={utilStyle.boldText}>{title}</p>
              </Link>
              <br />
              <small className={utilStyle.lightText}>
                {date}
              </small>
            </article>
          ))}
        </div>
      </section>

    </Layout>
  )
}
