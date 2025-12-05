import { COMMENTS_STORAGE_KEY } from "@/constants/storageKeys";

export const getStoredComments = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(
      window.localStorage.getItem(COMMENTS_STORAGE_KEY) || "[]"
    );
  } catch {
    return [];
  }
};

export const saveComments = (comments) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    COMMENTS_STORAGE_KEY,
    JSON.stringify(comments)
  );
};

