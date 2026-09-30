import profileImage from '../assets/myimage.jpeg';

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="about-content">
        <span className="section-tag developer-text">I AM A DEVELOPER</span>
        <h1>About <span>Me</span></h1>
        <div className="section-line" />
        <p>
          I am a passionate Full Stack Web Developer with a strong interest in building modern,
          responsive, and user-friendly web applications.
        </p>
        <p>
          I work with technologies including HTML, CSS, JavaScript, React.js, Node.js,
          Express.js, MongoDB, SQL, Git and GitHub.
        </p>
        <a href="shikhar-resume.pdf" className="resume-btn" download>
          DOWNLOAD RESUME
        </a>
      </div>
      <div className="about-image">
        <div className="image-wrapper">
          <img src={profileImage} alt="Shikhar Parihar" />
        </div>
      </div>
    </section>
  );
}
