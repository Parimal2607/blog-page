export default function CommentSkeletonList({ count = 2 }) {
  return (
    <div className="comment-skeleton-list">
      {Array.from({ length: count }).map((_, index) => (
        <div className="comment-skeleton" key={`comment-skeleton-${index}`}>
          <div className="comment-skeleton-avatar shimmer" />
          <div className="comment-skeleton-body">
            <div className="comment-skeleton-line shimmer" />
            <div className="comment-skeleton-line shimmer" />
            <div className="comment-skeleton-line short shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

