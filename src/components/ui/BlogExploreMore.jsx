"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { exploreMorePosts } from "@/data/blogData";
import SliderIcon from "@/assets/images/slider-icon.svg";

export default function BlogExploreMore() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const sliderEnabled = isMobile && exploreMorePosts.length > 1;
  const isPrevDisabled = !sliderEnabled || activeIndex === 0;
  const isNextDisabled =
    !sliderEnabled || activeIndex === exploreMorePosts.length - 1;

  const handleNavigate = (direction) => {
    if (
      (direction === -1 && isPrevDisabled) ||
      (direction === 1 && isNextDisabled)
    ) {
      return;
    }
    setActiveIndex((prev) => prev + direction);
  };

  return (
    <section className="explore-more">
      <h2 className="explore-more__title">Explore More</h2>
      <div className="explore-more__list-wrapper">
        <div
          className="explore-more__list"
          style={
            sliderEnabled
              ? { transform: `translateX(-${activeIndex * 100}%)` }
              : undefined
          }
        >
          {exploreMorePosts.map((post) => (
            <article className="explore-more__item" key={post.id}>
              <Image
                src={post.image}
                alt={post.alt}
                width={100}
                height={100}
                className="explore-more__image"
              />
              <div className="explore-more__meta">
                <p className="explore-more__meta-title">{post.title}</p>
                <span className="explore-more__meta-separator"></span>
                <p className="explore-more__meta-date">{post.date}</p>
              </div>
              <div className="explore-more__content">
                <p className="explore-more__description">{post.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      {sliderEnabled && (
        <div className="explore-more__controls slider-controls">
          <button
            className="slider-controls__button slider-controls__button--prev"
            onClick={() => handleNavigate(-1)}
            disabled={isPrevDisabled}
            aria-disabled={isPrevDisabled}
          >
            <Image src={SliderIcon} alt="Previous" width={16} height={16} />
            Previous
          </button>
          <button
            className="slider-controls__button slider-controls__button--next"
            onClick={() => handleNavigate(1)}
            disabled={isNextDisabled}
            aria-disabled={isNextDisabled}
          >
            Next
            <Image src={SliderIcon} alt="Next" width={16} height={16} />
          </button>
        </div>
      )}
    </section>
  );
}
