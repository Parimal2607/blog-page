"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EditPenIcon, RatingStarIcon } from "@/components/common/Icons";
import { commentsBySlug } from "@/data/blogData";
import { reactionMeta } from "@/constants/reactions";
import defaultAvatar from "@/assets/images/user-two.png";
import { getStoredComments } from "@/utils/commentStorage";
import CommentSkeletonList from "@/components/ui/CommentSkeletonList";
import CommentErrorState from "@/components/ui/CommentErrorState";

const getSeedComments = (slug) => commentsBySlug[slug] ?? [];

const normalizeComments = (stored, slug) => {
  const combined = [
    ...stored.filter((comment) => comment.postSlug === slug),
    ...getSeedComments(slug),
  ];
  const unique = [];
  const seen = new Set();

  combined.forEach((comment) => {
    if (comment?.id && !seen.has(comment.id)) {
      seen.add(comment.id);
      unique.push(comment);
    }
  });

  unique.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });

  return unique;
};

export default function BlogComments({ postSlug }) {
  const [combinedComments, setCombinedComments] = useState(() =>
    normalizeComments([], postSlug)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  const loadComments = useCallback(() => {
    if (typeof window === "undefined") return;
    setIsLoading(true);
    setError(null);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      try {
        const stored = getStoredComments();
        setCombinedComments(normalizeComments(stored, postSlug));
      } catch (err) {
        setError("Unable to load comments right now.");
      } finally {
        setIsLoading(false);
      }
    }, 2200);
  }, [postSlug]);

  useEffect(() => {
    loadComments();
    window.addEventListener("blog-comments-updated", loadComments);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("blog-comments-updated", loadComments);
    };
  }, [loadComments]);

  const handleEdit = (comment) => {
    window.dispatchEvent(
      new CustomEvent("blog-comment-edit-request", {
        detail: { ...comment, postSlug: comment.postSlug || postSlug },
      })
    );
  };

  return (
    <section className="comments">
      <div className="comments__container">
        <h2 className="comments__title">Comments</h2>
        {isLoading ? (
          <CommentSkeletonList count={3} />
        ) : error ? (
          <CommentErrorState message={error} onRetry={loadComments} />
        ) : (
          <div className="comments__list">
            {combinedComments.map((comment, index) => {
            const reaction = comment.reactionId
              ? reactionMeta[comment.reactionId]
              : null;
            const parsedRatingLabel =
              comment.ratingLabel !== undefined
                ? Number(
                    String(comment.ratingLabel).replace(/[^0-9.]/g, "")
                  )
                : undefined;
            const ratingValue =
              reaction?.rating ??
              comment.ratingValue ??
              parsedRatingLabel ??
              5;
            const avatarSrc = comment.image || defaultAvatar;

            const renderAvatar =
              comment.source === "user" ? (
                <div className="comments__avatar">
                  {(comment.name?.trim()?.[0] || "?").toUpperCase()}
                </div>
              ) : (
                <Image
                  src={avatarSrc}
                  alt={comment.name}
                  width={60}
                  height={60}
                  className="comments__image"
                />
              );

            return (
                <Fragment key={comment.id}>
                  <div className="comments__item">
                {renderAvatar}
                    <div className="comments__content">
                      <div className="comments__header">
                        <div className="comments__header-left">
                          <h3 className="comments__name">
                            {comment.name}
                          </h3>
                          <div className="comments__rating">
                            {Array.from({ length: ratingValue }).map(
                              (_, idx) => (
                                <RatingStarIcon
                                  key={`${comment.id}-rating-${idx}`}
                                  fill="#FFBB00"
                                />
                              )
                            )}
                            <p className="comments__rating-text">
                              ({ratingValue}.0)
                            </p>
                          </div>
                        </div>
                        <div className="comments__actions">
                          <p className="comments__date">
                            {comment.date}
                          </p>
                          {comment.source === "user" && (
                            <button
                              type="button"
                              className="comments__edit-button"
                              onClick={() => handleEdit(comment)}
                            >
                              <EditPenIcon />
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="comments__text">
                        {comment?.comment || comment?.text}
                      </p>
                    </div>
                  </div>
                  {index !== combinedComments.length - 1 && (
                    <div className="comments__separator"></div>
                  )}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
