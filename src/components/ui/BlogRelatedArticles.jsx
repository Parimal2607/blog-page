import Image from "next/image";
import Link from "next/link";
import { relatedArticlesData } from "@/data/blogData";

export default function BlogRelatedArticles() {
  return (
    <section id="related-articles" className="related-articles">
      <div className="related-articles__container">
        <h2 className="related-articles__title">Related Articles</h2>

        <div className="related-articles__list">
          {relatedArticlesData.map((article) => (
            <Link
              href={`/blog/${article.slug}`}
              className="related-articles__card"
              key={article.id}
            >
              <div className="related-articles__media">
                <Image
                  src={article.image}
                  alt={article.alt}
                  width={228}
                  height={228}
                  className="related-articles__image"
                />
              </div>
              <div className="related-articles__content">
                <p className="related-articles__card-title">
                  {article.title}
                </p>
                <p className="related-articles__description">
                  {article.description}
                </p>
                <p className="related-articles__author">
                  by {article.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

