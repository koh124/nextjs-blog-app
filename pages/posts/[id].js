import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";

// Next.jsではpages/*/[id].jsが、動的ルーティングで描画されるコンポーネントになる
// このファイルはリンクタグのhref属性の宛先を変数idにしたときにルーティング対象になる

// 動的ルーティングを設定したページでgetStaticPathsをexportすると、
// 指定されたURLをすべて静的にプリレンダリングする
// pathsのデータ形式 : [{ params: { id: '1' } }, {params: { id: '2' } }]
// これで 'posts/1' 'posts/2' のURLが静的生成される
export async function getStaticPaths() {
  const paths = getAllPostIds();

  // fallbackをfalseにすると指定されたパス以外のページをすべて404処理する
  return {
    paths,
    fallback: false,
  }
}

// getStaticPathsを使用した場合、必ずセットでgetStaticPropsも使用する必要がある
// この場合、postDataがpropsとしてpostコンポーネントに渡される
export async function getStaticProps({ params }) {
  // paramsの例
  // params: { id: 'pre-rendering-about' }
  // getStaticPropsのparamsには、アクセスしたページを識別するURLが渡されるようになっている
  // idに基づいて記事のコンテンツを取得する
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

// getStaticPropsから渡されたpropsを描画する
// このコンテンツはSSGプリレンダリングされる
export default function post({postData}) {
  return (
    <Layout>
      動的ルーティング設定
      {postData.title}
      {postData.date}
      {postData.blogContentHTML}
    </Layout>
  );
}

// export default function post({postData}) {
//   return (
//     <Layout>
//       動的ルーティング設定
//     </Layout>
//   );
// }
