import SectionHeading from '../components/SectionHeading.jsx';
import todoListPreview from '../assets/todolist-preview.svg';

export default function Projects() {
  return (
    <section id="projects" className="section projects-section animate-on-scroll">
      <SectionHeading eyebrow="MY WORK">
        My <span>Projects</span>
      </SectionHeading>
      <div className="projects-grid">
        <a
          className="project-card"
          href="https://shikhar-todolist.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open My To-Do List in a new tab"
        >
          <div className="project-card-image">
            <img src={todoListPreview} alt="Preview of the My To-Do List task dashboard" />
            <span className="project-card-open">Visit project</span>
          </div>
          <div className="project-card-content">
            <div className="project-card-title">
              <h2>My To-Do List</h2>
              <span aria-hidden="true">↗</span>
            </div>
            <p>A focused space to organize tasks, set priorities, and keep track of what’s next.</p>
            <ul className="project-card-tags" aria-label="Project features">
              <li>Task management</li>
              <li>Due dates</li>
              <li>Custom lists</li>
            </ul>
          </div>
        </a>
      </div>
    </section>
  );
}
