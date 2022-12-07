// プリレンダリング用の./posts/*.mdを解析するためのライブラリ群
import path from "path";
import fs from "fs";
import matter from "gray-matter";

// cwd=カレントディレクトリ
// postsへのパスを取得する
const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
// fs.readFileSyncは引数にディレクトリへのパスを渡すと配下のファイル名の配列を返し、
// ファイルへのフルパスを渡すとそのファイルをreadする
export function getPostsData() {
  // ['pre-rendering-about.md', 'pre-rendering.md', 'react-next.md', 'ssg-ssr.md']
  const fileNames = fs.readdirSync(postsDirectory);

  console.log(fileNames);
  const allPostsNames = fileNames.map((fileName) => {
    // 拡張子を取り除いてファイル名だけにし、これをidとする
    const id = fileName.replace(/\.md$/, "");
    console.log(id);

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    console.log(fileContents);

    const matterRes = matter(fileContents);

    // idとデータを返す
    return {
      id,
      ...matterRes.data
    }
  });
  return allPostsNames;
}
