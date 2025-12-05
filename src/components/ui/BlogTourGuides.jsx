import Image from "next/image";
import { LocationIcon, FourStarIcon, FiveStarIcon } from "@/components/common/Icons";
import { tourGuidesData } from "@/data/blogData";

const ratingIconMap = {
  four: FourStarIcon,
  five: FiveStarIcon,
};

export default function BlogTourGuides() {
  return (
    <section className="tour-guides">
      <h2 className="tour-guides__title">Tour Guides</h2>
      <div className="tour-guides__list">
        {tourGuidesData.map((guide, index) => {
          const RatingIcon = ratingIconMap[guide.ratingType] || FourStarIcon;
          const isLast = index === tourGuidesData.length - 1;

          return (
            <article className="tour-guides__item" key={guide.id}>
              <div className="tour-guides__header">
                <Image
                  src={guide.image}
                  alt={guide.name}
                  width={60}
                  height={60}
                  className="tour-guides__avatar"
                />
                <div className="tour-guides__info">
                  <h3 className="tour-guides__name">{guide.name}</h3>
                  <div className="tour-guides__location">
                    <LocationIcon />
                    <p className="tour-guides__location-text">{guide.location}</p>
                  </div>
                </div>
              </div>
              <div className="tour-guides__ratings">
                <RatingIcon />
                <p className="tour-guides__ratings-text">{guide.ratingLabel}</p>
              </div>
              {!isLast && <div className="tour-guides__separator" />}
            </article>
          );
        })}
      </div>
    </section>
  );
}

