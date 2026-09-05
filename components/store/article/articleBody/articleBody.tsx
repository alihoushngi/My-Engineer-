import {
  parseArticleBody,
  type ArticleBodyBlock,
} from "@/lib/articles/parse-article-body/parse-article-body";

type ArticleBodyProps = {
  markdown: string;
};

export function ArticleBody({ markdown }: ArticleBodyProps) {
  const blocks = parseArticleBody(markdown);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="prose-reading max-w-none type-body text-foreground">
      {blocks.map((block, index) => (
        <ArticleBlock key={blockKey(block, index)} block={block} />
      ))}
    </div>
  );
}

function ArticleBlock({ block }: { block: ArticleBodyBlock }) {
  if (block.type === "heading") {
    const className = "text-foreground";

    if (block.level === 2) {
      return (
        <h2 id={block.id} className={className}>
          {block.text}
        </h2>
      );
    }

    if (block.level === 3) {
      return (
        <h3 id={block.id} className={className}>
          {block.text}
        </h3>
      );
    }

    if (block.level === 4) {
      return (
        <h4 id={block.id} className={className}>
          {block.text}
        </h4>
      );
    }

    return (
      <h5 id={block.id} className={className}>
        {block.text}
      </h5>
    );
  }

  if (block.type === "blockquote") {
    return <blockquote>{block.text}</blockquote>;
  }

  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item, itemIndex) => (
          <li key={`${itemIndex}-${item}`}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p>{block.text}</p>;
}

function blockKey(block: ArticleBodyBlock, index: number): string {
  if (block.type === "heading") {
    return block.id;
  }

  return `${block.type}-${index}`;
}
