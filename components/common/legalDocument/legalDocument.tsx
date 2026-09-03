import { type LegalDocumentProps } from "@/components/common/legalDocument/type/legalDocument.types";
import { cn } from "@/lib/utils/cn/cn";

export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <article className="space-y-8">
      {document.sections.map((section) => (
        <section
          key={section.id}
          className="space-y-3"
          aria-labelledby={section.id}
        >
          <h2 id={section.id} className="type-h3 text-foreground">
            {section.title}
          </h2>
          {section.intro ? (
            <p className="type-body text-foreground">{section.intro}</p>
          ) : null}
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="type-body text-foreground">
              {paragraph}
            </p>
          ))}
          {section.items && section.items.length > 0 ? (
            <ul className="list-disc space-y-2 ps-5 type-body text-foreground">
              {section.items.map((item) => (
                <li key={`${item.term ?? ""}-${item.text}`}>
                  {item.term ? (
                    <>
                      <strong className="font-semibold">{item.term}</strong>
                      {` : ${item.text}`}
                    </>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      {document.contact ? (
        <section className="space-y-3" aria-labelledby="legal-contact-heading">
          <h2 id="legal-contact-heading" className="type-h3 text-foreground">
            {document.contact.heading}
          </h2>
          <ul className="space-y-2 type-body text-foreground">
            {document.contact.items.map((item) => (
              <li key={item.label}>
                <span className="font-semibold">{item.label}: </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      "rounded-md text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring",
                      item.ltr && "ltr-data",
                    )}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className={cn(item.ltr && "ltr-data")}>
                    {item.value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
