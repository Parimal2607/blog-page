export default function CommentErrorState({ message, onRetry }) {
  return (
    <div className="comment-error-state">
      <p>{message}</p>
      {onRetry && (
        <button className="blog--comments-edit-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

