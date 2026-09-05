"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import { ArticleToc } from "@/components/store/article/articleToc/articleToc";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { type ArticleTocItem } from "@/types/store/article.types";

type ArticleTocMobileProps = {
  items: readonly ArticleTocItem[];
};

export function ArticleTocMobile({ items }: ArticleTocMobileProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="lg:hidden">
      <AccordionItem value="toc" className="border-border">
        <AccordionTrigger>{articlesCopy.tocHeading}</AccordionTrigger>
        <AccordionContent className="pb-4">
          <ArticleToc items={items} headingHidden />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
