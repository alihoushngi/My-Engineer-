import assert from "node:assert/strict";
import test from "node:test";
import { flattenKnowledgeTips } from "./flatten-knowledge-tips.ts";

test("flattenKnowledgeTips keeps only tips with body text and category links", () => {
  const tips = flattenKnowledgeTips([
    {
      slug: "land-surveying",
      href: "/knowledge/land-surveying",
      title: "نقشه‌برداری",
      tips: [
        { id: "empty", title: "خالی", body: "   " },
        {
          id: "survey-tip",
          title: "نکته ۱",
          body: "پیش از برداشت مدارک را آماده کنید.",
        },
      ],
    },
  ]);

  assert.equal(tips.length, 1);
  assert.deepEqual(tips[0], {
    id: "survey-tip",
    title: "نکته ۱",
    body: "پیش از برداشت مدارک را آماده کنید.",
    categoryTitle: "نقشه‌برداری",
    href: "/knowledge/land-surveying",
  });
});
