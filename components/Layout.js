import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "kohei";
export const siteTitle = "Next.js blog";

// 今回、Layoutコンポーネントでは共通のレイアウトを定義している

// propsとして{ children: children }を受け取る
// typescriptだと引数にchildrenがないと怒られる
function Layout({children}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <header className={styles.header}>
        <img src="/images/profile.png" className={utilStyles.borderCircle} />
        <h1 className={utilStyles.heading2X}>{name}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
