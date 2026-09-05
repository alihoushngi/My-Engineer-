import { type ArticleComment } from "@/types/store/article.types";

type ArticleCommentListProps = {
  comments: readonly ArticleComment[];
};

export function ArticleCommentList({ comments }: ArticleCommentListProps) {
  return (
    <ul className="divide-y divide-border">
      {comments.map((comment) => (
        <li key={comment.id} className="py-5 first:pt-0">
          <article className="space-y-2">
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="type-body font-medium text-foreground">
                {comment.authorName}
              </h3>
              <p className="type-caption text-muted-foreground">
                {comment.createdAtLabel}
              </p>
            </header>
            <p className="type-body leading-loose text-foreground">
              {comment.body}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
