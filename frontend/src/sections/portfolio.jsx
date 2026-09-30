import SectionHeading from '../components/SectionHeading.jsx';

export default function Portfolio() {
  return (
    <section id="portfolio" className="section placeholder-section animate-on-scroll">
      <SectionHeading eyebrow="MY WORK">
        My <span>Portfolio</span>
      </SectionHeading>
      <div className="portfolio-card">
        <h2>Projects Coming Soon</h2>
        <p>More projects will be added here.</p>
      </div>
    </section>
  );
}
