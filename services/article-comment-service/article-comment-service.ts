/**
 * Article comments.
 * API CONTRACT REQUIRED — no documented comment endpoint exists.
 */
import {
  type ArticleComment,
  type SubmitArticleCommentInput,
} from "@/types/store/article.types";
import { env } from "@/lib/env/env";
import { throwApiUnavailable } from "@/lib/api/throw-api-unavailable/throw-api-unavailable";
import { mockArticleComments } from "@/lib/mock-data/article-comments-mock-data/article-comments-mock-data";
import { articleCommentSchema } from "@/lib/validation/article-comment/article-comment.schema";

const UNAVAILABLE_MESSAGE =
  "ارسال نظر هنوز به سرویس متصل نیست. بعداً دوباره تلاش کنید.";

export async function listArticleComments(
  articleId: string,
): Promise<readonly ArticleComment[]> {
  if (!env.useMockData) {
    return [];
  }

  return mockArticleComments.filter(
    (comment) => comment.articleId === articleId,
  );
}

export async function submitArticleComment(
  input: SubmitArticleCommentInput,
): Promise<ArticleComment> {
  const parsed = await articleCommentSchema.validate(
    {
      authorName: input.authorName,
      phone: input.phone,
      body: input.body,
    },
    { abortEarly: true },
  );

  if (!env.useMockData) {
    throwApiUnavailable(UNAVAILABLE_MESSAGE);
  }

  return {
    id: `cmt-local-${Date.now()}`,
    articleId: input.articleId,
    authorName: parsed.authorName,
    body: parsed.body,
    createdAtLabel: "همین حالا",
  };
}
