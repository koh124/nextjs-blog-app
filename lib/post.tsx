// プリレンダリング用の./posts/*.mdを解析するためのライブラリ群
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// getPostsDataの戻り値を明示するための型定義
export interface AllPostsData {
  id: string,
  title: string,
  date: string,
  thumbnail: string
}

// cwd=カレントディレクトリ
// postsへのパスを取得する
const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
// fs.readFileSyncは引数にディレクトリへのパスを渡すと配下のファイル名の配列を返し、
// ファイルへのフルパスを渡すとそのファイルをreadする
export function getPostsData(): AllPostsData[]  {
  // ['pre-rendering-about.md', 'pre-rendering.md', 'react-next.md', 'ssg-ssr.md']
  const fileNames = fs.readdirSync(postsDirectory);

  console.log(fileNames);
  const allPostsNames = fileNames.map((fileName) => {
    // 拡張子を取り除いてファイル名だけにし、これをidとする
    const id = fileName.replace(/\.md$/, "");
    console.log(id);

    // .mdファイルへの直接のパス
    const fullPath = path.join(postsDirectory, fileName);

    // ファイルのテキストを読み出す
    const fileContents = fs.readFileSync(fullPath, "utf8");
    console.log(fileContents);

    const matterRes = matter(fileContents);
    console.log(matterRes.data, 'here is data');

    // スプレッド構文を利用すれば記述は簡潔だが、
    // matterは実行しないと結果が分からないため静的解析が不可能
    // よってtypescriptに怒られる
    // return {
    //   id,
    //   ...matterRes.data
    // }

    return {
      id,
      title: matterRes.data.title,
      date: matterRes.data.date,
      thumbnail: matterRes.data.thumbnail
    }
  });
  console.log(allPostsNames);
  return allPostsNames;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, ""),
      },
    }
  })
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  // const blogContentHTML = matterResult.content

  const blogContent = await remark().use(html).process(matterResult.content)
  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  }
}
