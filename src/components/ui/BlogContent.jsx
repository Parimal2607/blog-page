import Image from "next/image";
import BlogAuthorSlider from "@/components/ui/BlogAuthorSlider";
import BlogExploreMore from "@/components/ui/BlogExploreMore";
import BlogTourGuides from "@/components/ui/BlogTourGuides";
import BlogComments from "./BlogComments";
import { blogContentData, DEFAULT_POST_SLUG } from "@/data/blogData";

export default function BlogContent({ postSlug = DEFAULT_POST_SLUG }) {
  const { author, introParagraphs, highlight, bodyParagraphs } = blogContentData;

  return (
    <section className="blog-content">
      <div className="blog-content__grid">
        <div className="blog-content__main">
          <div className="blog-content__header">
            <div className="blog-content__author">
              <div className="blog-content__author-avatar">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={32}
                  height={32}
                />
              </div>
              <div className="blog-content__author-info">
                <h3 className="blog-content__author-name">{author.name}</h3>
              </div>
            </div>
            <div className="blog-content__date-wrapper">
              <p className="blog-content__date">{author.date}</p>
            </div>
          </div>
          <div className="blog-content__divider"></div>
          <div className="blog-content__body">
            {introParagraphs.map((paragraph, index) => (
              <p
                key={`intro-${index}`}
                className={`blog-content__text${
                  index === introParagraphs.length - 1
                    ? " blog-content__text--spaced"
                    : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
            <div className="blog-content__divider"></div>
            <div className="blog-content__highlight">
              <p className="blog-content__highlight-text">{highlight}</p>
            </div>
            <div className="blog-content__divider"></div>
            {bodyParagraphs.map((paragraph, index) => (
              <p key={`body-${index}`} className="blog-content__text">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="blog-content__author-desktop">
            <BlogAuthorSlider />
          </div>
        </div>

        <div className="blog-content__sidebar">
          <BlogExploreMore />
          <BlogTourGuides />
        </div>
      </div>
      <div className="blog-content__comments-mobile">
        <BlogComments postSlug={postSlug} />
      </div>
      <div className="blog-content__author-mobile">
        <BlogAuthorSlider />
      </div>
    </section>
  );
}
