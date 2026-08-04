const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="mb-4 border-b border-border pb-2 font-display text-lg text-ink">
      {title}
    </h2>
    <div className="flex flex-col gap-4">{children}</div>
  </section>
);

export default Section;
