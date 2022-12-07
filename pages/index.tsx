import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import utilStyle from "../styles/utils.module.css"
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import { getPostsData } from "../lib/post.js";

// SSGの場合
// Next.js側でこの関数がすでに用意されている
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnailなど
  console.log(allPostsData);

  return {
    props: {
      allPostsData
    }
  }
}

// Layoutコンポーネントで囲んだテンプレートは、
// Layoutのpropsにchildrenとして渡される
// Layoutで挟んだコンポーネントのpropsには、渡されない模様
export default function Home({allPostsData}) {
  console.log(allPostsData);
  return (
    <Layout>
      <section className={utilStyle.headingMd}>
        <p>Lorem ipsam</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>
          <article>
            <Link href="/">
              <img
                src="/images/thumbnail01.jpg" alt=""
                className={styles.thumbnailImage}
              />
            </Link>
            <Link href="/">
              <p className={utilStyle.boldText}>SSGとSSRの使い分けの場面はいつなのか</p>
            </Link>
            <br />
            <small className={utilStyle.lightText}>
              6, December, 2022
            </small>
          </article>
          <article>
            <Link href="/">
              <img
                src="/images/thumbnail01.jpg" alt=""
                className={styles.thumbnailImage}
              />
            </Link>
            <Link href="/">
              <p className={utilStyle.boldText}>SSGとSSRの使い分けの場面はいつなのか</p>
            </Link>
            <br />
            <small className={utilStyle.lightText}>
              6, December, 2022
            </small>
          </article>
          <article>
            <Link href="/">
              <img
                src="/images/thumbnail01.jpg" alt=""
                className={styles.thumbnailImage}
              />
            </Link>
            <Link href="/">
              <p className={utilStyle.boldText}>SSGとSSRの使い分けの場面はいつなのか</p>
            </Link>
            <br />
            <small className={utilStyle.lightText}>
              6, December, 2022
            </small>
          </article>
          <article>
            <Link href="/">
              <img
                src="/images/thumbnail01.jpg" alt=""
                className={styles.thumbnailImage}
              />
            </Link>
            <Link href="/">
              <p className={utilStyle.boldText}>SSGとSSRの使い分けの場面はいつなのか</p>
            </Link>
            <br />
            <small className={utilStyle.lightText}>
              6, December, 2022
            </small>
          </article>
        </div>
      </section>

    </Layout>
  )
}
