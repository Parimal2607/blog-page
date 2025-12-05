import Head from "next/head";
import BlogPostDetail from "@/components/ui/BlogPostDetail";
import { blogPosts } from "@/data/posts";

export default function BlogPostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <BlogPostDetail post={post} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
}

