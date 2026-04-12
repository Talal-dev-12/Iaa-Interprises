interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  light?: boolean;
}

const SectionHeading = ({ label, title, description, light }: SectionHeadingProps) => (
  <div className="text-center max-w-2xl mx-auto mb-12">
    {label && (
      <span className={`text-sm font-semibold tracking-widest uppercase ${light ? "text-accent" : "text-accent"}`}>
        {label}
      </span>
    )}
    <h2 className={`text-3xl md:text-4xl font-display font-bold mt-2 ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-4 text-base leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
