"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldError,
  FieldHint,
  FieldLabel,
} from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import {
  articleCommentSchema,
  type ArticleCommentFormValues,
} from "@/lib/validation/article-comment/article-comment.schema";
import { submitArticleComment } from "@/services/article-comment-service/article-comment-service";
import { type ArticleComment } from "@/types/store/article.types";

type ArticleCommentFormProps = {
  articleId: string;
  onCreated: (comment: ArticleComment) => void;
};

export function ArticleCommentForm({
  articleId,
  onCreated,
}: ArticleCommentFormProps) {
  const mutation = useApiMutation(submitArticleComment);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArticleCommentFormValues>({
    resolver: yupResolver(articleCommentSchema),
    defaultValues: { authorName: "", phone: "", body: "" },
  });

  async function onSubmit(values: ArticleCommentFormValues) {
    const comment = await mutation.mutateAsync({
      articleId,
      authorName: values.authorName,
      phone: values.phone,
      body: values.body,
    });
    onCreated(comment);
    reset();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {mutation.isError ? (
        <Alert variant="danger">
          <AlertTitle>
            {toUserErrorMessage(
              mutation.error,
              articlesCopy.commentErrorFallback,
            )}
          </AlertTitle>
        </Alert>
      ) : null}
      {mutation.isSuccess ? (
        <Alert variant="info">
          <AlertTitle>{articlesCopy.commentMockSuccessTitle}</AlertTitle>
          <AlertDescription>
            {articlesCopy.commentMockSuccessDescription}
          </AlertDescription>
        </Alert>
      ) : null}
      <Field invalid={Boolean(errors.authorName)}>
        <FieldLabel htmlFor="article-comment-name" required>
          {articlesCopy.commentNameLabel}
        </FieldLabel>
        <Input
          id="article-comment-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.authorName)}
          {...register("authorName")}
        />
        <FieldError>{errors.authorName?.message}</FieldError>
      </Field>
      <Field invalid={Boolean(errors.phone)}>
        <FieldLabel htmlFor="article-comment-phone" required>
          {articlesCopy.commentPhoneLabel}
        </FieldLabel>
        <Input
          id="article-comment-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
        <FieldHint>{articlesCopy.commentPhoneHint}</FieldHint>
        <FieldError>{errors.phone?.message}</FieldError>
      </Field>
      <Field invalid={Boolean(errors.body)}>
        <FieldLabel htmlFor="article-comment-body" required>
          {articlesCopy.commentBodyLabel}
        </FieldLabel>
        <Textarea
          id="article-comment-body"
          rows={5}
          aria-invalid={Boolean(errors.body)}
          {...register("body")}
        />
        <FieldError>{errors.body?.message}</FieldError>
      </Field>
      <Button type="submit" loading={isSubmitting || mutation.isPending}>
        {articlesCopy.commentSubmitLabel}
      </Button>
    </form>
  );
}
