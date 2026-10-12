import profileImage from '../assets/myimage.jpeg';

const orbitSkills = [
  ['HTML5', 'html5'],
  ['CSS3', 'css'],
  ['JavaScript', 'javascript'],
  ['React.js', 'react'],
  ['Node.js', 'nodedotjs'],
  ['Express.js', 'express'],
  ['MongoDB', 'mongodb'],
  ['SQL', 'mysql'],
  ['Git', 'git'],
  ['GitHub', 'github'],
];

const orbitRings = [
  {
    className: 'inner',
    skills: orbitSkills.filter((_, index) => index % 2 === 0),
    angleOffset: 0,
  },
  {
    className: 'outer',
    skills: orbitSkills.filter((_, index) => index % 2 === 1),
    angleOffset: 36,
  },
];

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
        <div className="about-actions">
          <a href="shikhar-resume.pdf" className="resume-btn" download>
            DOWNLOAD RESUME
          </a>
          <a href="#projects" className="resume-btn projects-btn">
            VISIT PROJECTS
          </a>
        </div>
      </div>
      <div className="about-image">
        <div className="about-orbit" aria-hidden="true">
          {orbitRings.map(({ className, skills, angleOffset }) => (
            <div className={`about-orbit-ring about-orbit-ring-${className}`} key={className}>
              {skills.map(([name, icon], index) => {
                const angle = index * (360 / skills.length) + angleOffset;
                return (
                  <span
                    className="about-orbit-skill"
                    key={name}
                    style={{
                      '--orbit-angle': `${angle}deg`,
                      '--orbit-counter-angle': `${-angle}deg`,
                    }}
                  >
                    <img src={`https://simpleicons.org/icons/${icon}.svg`} alt="" />
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        <div className="image-wrapper">
          <img src={profileImage} alt="Shikhar Parihar" />
        </div>
      </div>
    </section>
  );
}
