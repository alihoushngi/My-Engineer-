export type FlattenedKnowledgeTip = {
  id: string;
  title: string;
  body: string;
  categoryTitle: string;
  href: string;
};

type KnowledgeTipInput = {
  id: string;
  title: string;
  body?: string;
};

type KnowledgeCategoryInput = {
  href: string;
  title: string;
  tips: readonly KnowledgeTipInput[];
};

export function flattenKnowledgeTips(
  categories: readonly KnowledgeCategoryInput[],
): readonly FlattenedKnowledgeTip[] {
  return categories.flatMap((category) =>
    category.tips
      .filter((tip) => Boolean(tip.body?.trim()))
      .map((tip) => ({
        id: tip.id,
        title: tip.title,
        body: tip.body?.trim() ?? "",
        categoryTitle: category.title,
        href: category.href,
      })),
  );
}
