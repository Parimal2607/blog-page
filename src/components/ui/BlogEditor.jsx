"use client";

import { useState } from "react";

export default function BlogEditor({ initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="blog--editor">
      <textarea
        className="blog--editor-textarea"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        spellCheck={false}
      />
      <p className="blog--editor-hint">
        This editor is for demonstration only. Changes are not saved.
      </p>
    </div>
  );
}

