"use client";

import { useMemo, useState } from "react";
import { MessageSquareIcon } from "lucide-react";
import { Pagination } from "@/components/common/pagination/pagination";
import { ArticleCommentForm } from "@/components/store/article/articleCommentForm/articleCommentForm";
import { ArticleCommentList } from "@/components/store/article/articleCommentList/articleCommentList";
import { Empty } from "@/components/ui/empty/empty";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type ArticleComment } from "@/types/store/article.types";

type ArticleCommentsProps = {
  articleId: string;
  comments: readonly ArticleComment[];
};

export function ArticleComments({ articleId, comments }: ArticleCommentsProps) {
  const [items, setItems] = useState(comments);
  const [page, setPage] = useState(1);
  const pagination = useMemo(() => paginateItems(items, page), [items, page]);

  return (
    <section className="space-y-8" aria-labelledby="article-comments-heading">
      <h2 id="article-comments-heading" className="type-h3 text-foreground">
        {articlesCopy.commentsHeading}
      </h2>
      {pagination.total === 0 ? (
        <Empty
          icon={<MessageSquareIcon aria-hidden="true" />}
          title={articlesCopy.commentsEmptyTitle}
          description={articlesCopy.commentsEmptyDescription}
        />
      ) : (
        <>
          <ArticleCommentList comments={pagination.items} />
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={articlesCopy.commentsPaginationLabel}
            onPageChange={setPage}
          />
        </>
      )}
      <ArticleCommentForm
        articleId={articleId}
        onCreated={(comment) => {
          setItems((current) => [comment, ...current]);
          setPage(1);
        }}
      />
    </section>
  );
}
