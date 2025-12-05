"use client";

import Image from "next/image";
import { blogSliderData } from "@/data/blogData";
import { useEffect, useRef, useState } from "react";
import SliderIcon from "@/assets/images/slider-icon.svg";

export default function BlogAuthorSlider() {
  const { title, avatar, authorName, links, slides = [] } = blogSliderData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);

  const currentSlide =
    slides[activeIndex] || slides[0] || { description: "" };

  const isPrevDisabled = activeIndex === 0;
  const isNextDisabled = slides.length
    ? activeIndex === slides.length - 1
    : true;

  const handleNavigate = (direction) => {
    if (
      (direction === -1 && isPrevDisabled) ||
      (direction === 1 && isNextDisabled)
    ) {
      return;
    }

    setIsAnimating(true);
    clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => prev + direction);
      setIsAnimating(false);
    }, 220);
  };

  useEffect(
    () => () => clearTimeout(animationTimeoutRef.current),
    []
  );

  return (
    <section className="author-slider">
      <div className="author-slider__divider"></div>
      <div className="author-slider__content">
        <article className="author-slider__card">
          <div className="author-slider__info">
            <h3 className="author-slider__title">{title}</h3>
            <div className="author-slider__avatar">
              <Image
                src={avatar}
                alt={authorName}
                width={100}
                height={100}
                className="author-slider__avatar-image"
              />
            </div>
            <p
              className="author-slider__description"
              style={{
                opacity: isAnimating ? 0 : 1,
                transition: "opacity 220ms ease",
              }}
            >
              {currentSlide.description}
            </p>
          </div>
        </article>
      </div>
      <div className="author-slider__divider"></div>

      <div className="author-slider__controls slider-controls">
        <div className="author-slider__control author-slider__control--prev">
          <button
            className="slider-controls__button slider-controls__button--prev"
            onClick={() => handleNavigate(-1)}
            disabled={isPrevDisabled}
            aria-disabled={isPrevDisabled}
          >
            <Image src={SliderIcon} alt={links.previous.label} width={16} height={16} />{" "}
            {links.previous.label}
          </button>
          <p className="author-slider__control-text">{links.previous.description}</p>
        </div>
        <div className="author-slider__control author-slider__control--next">
          <button
            className="slider-controls__button slider-controls__button--next"
            onClick={() => handleNavigate(1)}
            disabled={isNextDisabled}
            aria-disabled={isNextDisabled}
          >
            {links.next.label}{" "}
            <Image src={SliderIcon} alt={links.previous.label} width={16} height={16} />
          </button>
          <p className="author-slider__control-text">{links.next.description}</p>
        </div>
      </div>
    </section>
  );
}