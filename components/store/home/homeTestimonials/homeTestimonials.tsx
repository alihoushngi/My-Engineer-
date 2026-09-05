import { homeTestimonialCopy } from "@/config/home.config/home.config";

export function HomeTestimonials() {
  return (
    <section
      aria-labelledby="home-testimonials-heading"
      className="bg-surface-subtle py-section"
    >
      <div className="container-narrow space-y-6 text-center">
        <h2 id="home-testimonials-heading" className="type-h1">
          {homeTestimonialCopy.title}
        </h2>
        <blockquote className="space-y-5">
          <p className="type-body-lg text-foreground">
            «{homeTestimonialCopy.quote}»
          </p>
          <footer className="space-y-1">
            <cite className="not-italic type-h4">
              {homeTestimonialCopy.author}
            </cite>
            <p className="type-body-sm text-muted-foreground">
              {homeTestimonialCopy.role}
            </p>
          </footer>
        </blockquote>
        <p className="type-caption text-muted-foreground">
          {homeTestimonialCopy.submitNote}
        </p>
      </div>
    </section>
  );
}
