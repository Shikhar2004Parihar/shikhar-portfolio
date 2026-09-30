import SectionHeading from '../components/SectionHeading.jsx';

export default function Education() {
  return (
    <section id="education" className="section placeholder-section animate-on-scroll">
      <SectionHeading eyebrow="MY BACKGROUND">
        My <span>Education</span>
      </SectionHeading>
      <div className="placeholder-card">
        <h2>Master of Computer Applications</h2>
        <p>MCA - SAGE UNIVERSITY INDORE</p>
      </div>
      <div className="placeholder-card">
        <h2>Bachelor of Science</h2>
        <p>BSc - VITS COLLEGE SATNA</p>
      </div>
    </section>
  );
}
