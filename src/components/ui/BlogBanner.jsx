import Image from "next/image";
import { blogBannerData } from "@/data/blogData";

export default function BlogBanner() {
  const { image, alt, width, height } = blogBannerData;

  return (
    <section className="blog-banner">
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        className="blog-banner__image"
      />
    </section>
  );
}
