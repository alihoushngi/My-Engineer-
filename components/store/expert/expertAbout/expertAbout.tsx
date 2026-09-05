"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { expertProfileCopy } from "@/config/experts.config/experts.config";

const COLLAPSE_LENGTH = 180;

type ExpertAboutProps = {
  about?: string;
};

export function ExpertAbout({ about }: ExpertAboutProps) {
  const [expanded, setExpanded] = useState(false);
  const text = about?.trim() ?? "";

  if (text === "") {
    return (
      <section
        aria-labelledby="expert-about-heading"
        className="py-8 first:pt-0"
      >
        <SectionHeader
          titleId="expert-about-heading"
          title={expertProfileCopy.aboutTitle}
        />
        <p className="mt-6 type-body text-muted-foreground">
          {expertProfileCopy.aboutEmpty}
        </p>
      </section>
    );
  }

  const canCollapse = text.length > COLLAPSE_LENGTH;
  const visibleText =
    !canCollapse || expanded
      ? text
      : `${text.slice(0, COLLAPSE_LENGTH).trim()}…`;

  return (
    <section aria-labelledby="expert-about-heading" className="py-8 first:pt-0">
      <div className="max-w-3xl space-y-6">
        <SectionHeader
          titleId="expert-about-heading"
          title={expertProfileCopy.aboutTitle}
        />
        <div className="space-y-4">
          {visibleText.split("\n\n").map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="type-body leading-loose text-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
        {canCollapse ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setExpanded((current) => !current);
            }}
            aria-expanded={expanded}
          >
            {expanded
              ? expertProfileCopy.aboutCollapse
              : expertProfileCopy.aboutExpand}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
