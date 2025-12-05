export default function FormField({ label, children }) {
  return (
    <div className="comment-form__item">
      <label className="comment-form__label">{label}</label>
      {children}
    </div>
  );
}

