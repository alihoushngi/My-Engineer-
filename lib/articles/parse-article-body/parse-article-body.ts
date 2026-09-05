export type ArticleHeadingLevel = 2 | 3 | 4 | 5;

export type ArticleBodyBlock =
  | {
      type: "heading";
      level: ArticleHeadingLevel;
      id: string;
      text: string;
    }
  | { type: "paragraph"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; items: readonly string[] };

export type DerivedArticleTocItem = {
  id: string;
  label: string;
  level: ArticleHeadingLevel;
};

const HEADING_PATTERN = /^(#{2,5})\s+(.+)$/;

export function slugifyHeading(text: string): string {
  const slug = text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return slug === "" ? "section" : slug;
}

export function uniqueHeadingId(
  text: string,
  seen: Map<string, number>,
): string {
  const base = slugifyHeading(text);
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);

  return count === 0 ? base : `${base}-${count + 1}`;
}

export function parseArticleBody(markdown: string): ArticleBodyBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ArticleBodyBlock[] = [];
  const seenIds = new Map<string, number>();
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let quoteLines: string[] = [];

  function flushParagraph() {
    const text = paragraph.join(" ").trim();
    paragraph = [];

    if (text !== "") {
      blocks.push({ type: "paragraph", text });
    }
  }

  function flushList() {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  }

  function flushQuote() {
    const text = quoteLines.join(" ").trim();
    quoteLines = [];

    if (text !== "") {
      blocks.push({ type: "blockquote", text });
    }
  }

  function flushInline() {
    flushParagraph();
    flushList();
    flushQuote();
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const heading = line.trim().match(HEADING_PATTERN);

    if (heading) {
      flushInline();
      const marks = heading[1] ?? "##";
      const text = (heading[2] ?? "").trim();
      const level = Math.min(
        5,
        Math.max(2, marks.length),
      ) as ArticleHeadingLevel;
      blocks.push({
        type: "heading",
        level,
        id: uniqueHeadingId(text, seenIds),
        text,
      });
      continue;
    }

    if (line.trim() === "") {
      flushInline();
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      quoteLines.push(line.slice(2).trim());
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      flushQuote();
      listItems.push(line.slice(2).trim());
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }

  flushInline();
  return blocks;
}

export function tocFromArticleBlocks(
  blocks: readonly ArticleBodyBlock[],
): DerivedArticleTocItem[] {
  return blocks.flatMap((block) =>
    block.type === "heading"
      ? [{ id: block.id, label: block.text, level: block.level }]
      : [],
  );
}
