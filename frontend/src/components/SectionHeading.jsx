export default function SectionHeading({ eyebrow, children }) {
  return (
    <div className="section-heading">
      <span className="section-tag">{eyebrow}</span>
      <h1>{children}</h1>
      <div className="section-line" />
    </div>
  );
}
