import BlogBanner from "@/components/ui/BlogBanner";
import BlogCommentForm from "@/components/ui/BlogCommentForm";
import BlogComments from "@/components/ui/BlogComments";
import BlogContent from "@/components/ui/BlogContent";
import BlogHeader from "@/components/ui/BlogHeader";
import BlogRelatedArticles from "@/components/ui/BlogRelatedArticles";
import { DEFAULT_POST_SLUG } from "@/data/blogData";

export default function HomePage() {
  const homeSlug = DEFAULT_POST_SLUG;

  return (
    <>
      <BlogHeader />
      <main className="blog--main">
        <BlogBanner />
        <BlogContent postSlug={homeSlug} />
        <div className="blog--comments-section-desktop">
          <BlogComments postSlug={homeSlug} />
        </div>
        <BlogCommentForm postSlug={homeSlug} />
        <BlogRelatedArticles />
      </main>
    </>
  );
}

