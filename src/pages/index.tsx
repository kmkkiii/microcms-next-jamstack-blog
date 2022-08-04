import type { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { client } from 'libs/client'; // srcから見た絶対パスで指定
import type { Blog, Tag } from 'types/blog'; // srcから見た絶対パスで指定

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: 'blog' });
  const tag = await client.get({ endpoint: 'tag' });

  return {
    props: {
      blogs: blog.contents,
      tags: tag.contents,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
  tags: Tag[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blogs, tags }: Props) => {
  console.log(blogs);
  console.log(tags);
};
export default Home;
