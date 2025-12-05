export default function TextArea({ className = "", ...props }) {
  return (
    <textarea
      className={`comment-form__textarea ${className}`}
      {...props}
    />
  );
}

