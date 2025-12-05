export default function TextInput({ className = "", ...props }) {
  return (
    <input className={`comment-form__input ${className}`} {...props} />
  );
}

