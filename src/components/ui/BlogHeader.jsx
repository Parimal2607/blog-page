import Link from "next/link";
import { blogHeaderData } from "@/data/blogData";

export default function BlogHeader() {
  const { title, breadcrumbs } = blogHeaderData;

  return (
    <header className="blog-header">
      <div className="blog-header__breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const linkClass = `blog-header__link${
            breadcrumb.isActive ? " blog-header__link--active" : ""
          }`;

          return (
            <>
              <span key={breadcrumb.label}>
                <Link href={breadcrumb.href} className={linkClass}>
                  {breadcrumb.label}
                </Link>
              </span>
              {!isLast && <span className="blog-header__separator">/</span>}
            </>
          );
        })}
        <span className="blog-header__separator">/</span>
      </div>
      <h1 className="blog-header__title">{title}</h1>
    </header>
  );
}
