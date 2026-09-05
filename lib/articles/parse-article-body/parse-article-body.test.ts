import assert from "node:assert/strict";
import test from "node:test";
import {
  parseArticleBody,
  slugifyHeading,
  tocFromArticleBlocks,
  uniqueHeadingId,
} from "./parse-article-body.ts";

test("slugifyHeading keeps Persian letters and strips unsafe characters", () => {
  assert.equal(slugifyHeading("نقشه UTM چیست؟"), "نقشه-utm-چیست");
  assert.equal(slugifyHeading("Hello, World!"), "hello-world");
  assert.equal(slugifyHeading("  "), "section");
});

test("uniqueHeadingId suffixes duplicate headings starting at 2", () => {
  const seen = new Map<string, number>();

  assert.equal(uniqueHeadingId("عنوان", seen), "عنوان");
  assert.equal(uniqueHeadingId("عنوان", seen), "عنوان-2");
});

test("parseArticleBody preserves heading levels and derives a hierarchical toc", () => {
  const blocks = parseArticleBody(`## نقشه UTM چیست؟

پاراگراف اول.

### کاربرد در جانمایی

- مورد یک
- مورد دو

#### سامانه مختصات

> نقل‌قول کوتاه.

##### دقت برداشت

## نقشه UTM چیست؟
`);

  const toc = tocFromArticleBlocks(blocks);

  assert.deepEqual(
    toc.map((item) => [item.level, item.id, item.label]),
    [
      [2, "نقشه-utm-چیست", "نقشه UTM چیست؟"],
      [3, "کاربرد-در-جانمایی", "کاربرد در جانمایی"],
      [4, "سامانه-مختصات", "سامانه مختصات"],
      [5, "دقت-برداشت", "دقت برداشت"],
      [2, "نقشه-utm-چیست-2", "نقشه UTM چیست؟"],
    ],
  );
  assert.equal(
    blocks.some((block) => block.type === "list" && block.items.length === 2),
    true,
  );
  assert.equal(
    blocks.some(
      (block) => block.type === "blockquote" && block.text.includes("نقل‌قول"),
    ),
    true,
  );
});
