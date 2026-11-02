import ButtonLink from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-charcoal pt-32 pb-20">
      <div className="container-luxe">
        <p className="eyebrow text-gold">Page not found</p>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] text-ivory sm:text-7xl">This page has moved, or never existed.</h1>
        <p className="mt-6 max-w-lg text-ivory/70">Return to the homepage or get in touch directly and Gescard will help you find what you need.</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact/" variant="outline">Contact Gescard</ButtonLink>
        </div>
      </div>
    </section>
  );
}
