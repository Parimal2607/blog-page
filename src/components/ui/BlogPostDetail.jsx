"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import BlogComments from "@/components/ui/BlogComments";
import BlogCommentForm from "@/components/ui/BlogCommentForm";
import BlogRelatedArticles from "./BlogRelatedArticles";

const BlogEditor = dynamic(() => import("@/components/ui/BlogEditor"), {
  ssr: false,
  loading: () => (
    <p className="blog--editor-loading">Loading editor, please wait…</p>
  ),
});

export default function BlogPostDetail({ post }) {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <main className="blog-post-page">
      <header className="blog-post-page__header">
        <Link href="/" className="blog-post-page__back">
          ← Back to Home
        </Link>
        <p className="blog-post-page__date">{post.date}</p>
        <h1 className="blog-post-page__title">{post.title}</h1>
      </header>

      {post.hero && (
        <div className="blog-post-page__hero">
          <Image
            src={post.hero}
            alt={post.heroAlt || post.title}
            width={1200}
            height={300}
            priority
          />
        </div>
      )}

      <article className="blog-post-page__body">
        {post.body.map((paragraph, index) => (
          <p key={`${post.slug}-p-${index}`}>{paragraph}</p>
        ))}
      </article>

      <div className="blog-post-page__editor blog-post-page__editor-detail">
        <button
          type="button"
          className="comments__edit-button blog-post-page__editor-toggle"
          onClick={() => setShowEditor((prev) => !prev)}
        >
          {showEditor ? "Hide Editor" : "Edit Content"}
        </button>
        {showEditor && (
          <Suspense fallback={<p className="blog--editor-loading">Loading…</p>}>
            <BlogEditor initialValue={post.body.join("\n\n")} />
          </Suspense>
        )}
      </div>

      <section className="blog-post-page__comments">
        <BlogComments postSlug={post.slug} />
        <BlogCommentForm postSlug={post.slug} />
        <BlogRelatedArticles />
      </section>
    </main>
  );
}

