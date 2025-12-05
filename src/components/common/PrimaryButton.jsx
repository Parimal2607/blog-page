export default function PrimaryButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`comment-form__submit ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

