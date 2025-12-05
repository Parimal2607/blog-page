"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SendMessageIcon } from "@/components/common/Icons";
import FormField from "@/components/common/FormField";
import PrimaryButton from "@/components/common/PrimaryButton";
import TextArea from "@/components/common/TextArea";
import TextInput from "@/components/common/TextInput";
import { reactionOptions, reactionMeta } from "@/constants/reactions";
import { commentFormMessages } from "@/constants/formMessages";
import { getStoredComments, saveComments } from "@/utils/commentStorage";
import { DEFAULT_POST_SLUG } from "@/data/blogData";

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, commentFormMessages.nameMin)
    .required(commentFormMessages.nameRequired),
  email: yup
    .string()
    .trim()
    .email(commentFormMessages.emailInvalid)
    .required(commentFormMessages.emailRequired),
  comment: yup
    .string()
    .trim()
    .min(10, commentFormMessages.commentMin)
    .required(commentFormMessages.commentRequired),
  reaction: yup
    .string()
    .oneOf(reactionOptions.map((reaction) => reaction.id))
    .required(commentFormMessages.reactionRequired),
});

const generateCommentId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `comment-${crypto.randomUUID()}`;
  }
  return `comment-${Math.random().toString(36).slice(2)}`;
};

export default function BlogCommentForm({ postSlug = DEFAULT_POST_SLUG }) {
  const [selectedReaction, setSelectedReaction] = useState(
    reactionOptions[reactionOptions.length - 1]
  );
  const [editingComment, setEditingComment] = useState(null);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
      reaction: selectedReaction.id,
    },
  });

  useEffect(() => {
    setValue("reaction", selectedReaction.id, { shouldValidate: true });
  }, [selectedReaction, setValue]);

  useEffect(() => {
    const handleEditRequest = (event) => {
      const comment = event.detail;
      if (!comment) return;
      const commentSlug = comment.postSlug || DEFAULT_POST_SLUG;
      if (commentSlug !== postSlug) return;

      setEditingComment(comment);
      const targetReaction =
        reactionMeta[comment.reactionId] ||
        reactionOptions[reactionOptions.length - 1];
      setSelectedReaction(targetReaction);
      reset({
        name: comment.name || "",
        email: comment.email || "",
        comment: comment.comment || comment.text || "",
        reaction: targetReaction.id,
      });
    };

    window.addEventListener("blog-comment-edit-request", handleEditRequest);
    return () =>
      window.removeEventListener(
        "blog-comment-edit-request",
        handleEditRequest
      );
  }, [postSlug, reset]);

  const handleReactionSelection = (reaction) => {
    setSelectedReaction(reaction);
    setValue("reaction", reaction.id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const resetForm = () => {
    setEditingComment(null);
    setSelectedReaction(reactionOptions[reactionOptions.length - 1]);
    reset({
      name: "",
      email: "",
      comment: "",
      reaction: reactionOptions[reactionOptions.length - 1].id,
    });
  };

  const onSubmit = async (formData) => {
    const reaction = reactionMeta[formData.reaction] || selectedReaction;
    const stored = getStoredComments();
    const timestamp = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    if (editingComment) {
      const updated = stored.map((comment) =>
        comment.id === editingComment.id
          ? {
              ...comment,
              source: "user",
              postSlug,
              name: formData.name.trim(),
              email: formData.email.trim(),
              comment: formData.comment.trim(),
              date: timestamp,
              reactionId: reaction.id,
              ratingValue: reaction.rating,
            }
          : comment
      );
      saveComments(updated);
      toast.success("Comment updated successfully!");
    } else {
      const newComment = {
        id: generateCommentId(),
        source: "user",
        postSlug,
        name: formData.name.trim(),
        email: formData.email.trim(),
        comment: formData.comment.trim(),
        date: timestamp,
        reactionId: reaction.id,
        ratingValue: reaction.rating,
      };
      saveComments([newComment, ...stored]);
      toast.success("Thanks for sharing your feedback!");
    }

    window.dispatchEvent(new Event("blog-comments-updated"));
    resetForm();
  };

  return (
    <section className="comment-form">
      <div className="comment-form__container">
        <h2 className="comment-form__title">Add a comment</h2>
        <form className="comment-form__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="comment-form__grid">
            <FormField label="Name">
              <div className="comment-form__input-wrapper">
                <TextInput
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="comment-form__error">{errors.name.message}</p>
                )}
              </div>
            </FormField>

            <FormField label="Email">
              <div className="comment-form__input-wrapper">
                <TextInput
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="comment-form__error">{errors.email.message}</p>
                )}
              </div>
            </FormField>

            <FormField label="Comment">
              <div className="comment-form__input-wrapper">
                <TextArea
                  placeholder="Share your thoughts..."
                  {...register("comment")}
                  rows={5}
                />
                {errors.comment && (
                  <p className="comment-form__error comment-form__error--inline">{errors.comment.message}</p>
                )}
              </div>
            </FormField>
          </div>

          <div className="comment-form__actions">
            <div className="comment-form__reaction">
              <p className="comment-form__reaction-text">
                Rate the usefulness of the article
              </p>
              <div className="comment-form__reaction-icons">
                {reactionOptions.map((reaction) => (
                  <button
                    type="button"
                    key={reaction.id}
                    className={`comment-form__reaction-icon${
                      selectedReaction.id === reaction.id ? " is-active" : ""
                    }`}
                    aria-pressed={selectedReaction.id === reaction.id}
                    onClick={() => handleReactionSelection(reaction)}
                  >
                    <reaction.Icon />
                  </button>
                ))}
              </div>
              {errors.reaction && (
                <p className="comment-form__error comment-form__error--inline">
                  {errors.reaction.message}
                </p>
              )}
            </div>
            <div className="comment-form__submit-group">
              <button
                type="button"
                className="comment-form__reaction-pill"
                style={{ backgroundColor: selectedReaction.color }}
              >
                <selectedReaction.Icon />
                {selectedReaction.label}
              </button>
              {editingComment && (
                <button
                  type="button"
                  className="comments__edit-button"
                  onClick={resetForm}
                >
                  Cancel edit
                </button>
              )}
              <PrimaryButton
                type="submit"
                disabled={isSubmitting || (editingComment !== null && !isDirty)}
              >
                <SendMessageIcon />{" "}
                {isSubmitting
                  ? "Saving..."
                  : editingComment
                  ? "Update"
                  : "Send"}
              </PrimaryButton>
            </div>
          </div>
        </form>
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </section>
  );
}
