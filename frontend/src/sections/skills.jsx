import SectionHeading from '../components/SectionHeading.jsx';

const skillGroups = [
  {
    title: 'FRONTEND',
    skills: [
      ['HTML5', 'html5'],
      ['CSS3', 'css'],
      ['JavaScript', 'javascript'],
      ['React.js', 'react'],
      ['Bootstrap', 'bootstrap'],
      ['AOS library', null],
    ],
  },
  {
    title: 'BACKEND',
    skills: [
      ['Node.js', 'nodedotjs'],
      ['Express.js', 'express'],
    ],
  },
  {
    title: 'DATABASE',
    skills: [
      ['MongoDB', 'mongodb'],
      ['SQL', 'mysql'],
    ],
  },
  {
    title: 'VERSION CONTROL',
    skills: [
      ['Git', 'git'],
      ['GitHub', 'github'],
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section skills animate-on-scroll">
      <SectionHeading eyebrow="MY EXPERTISE">
        My <span>Skills</span>
      </SectionHeading>
      <div className="skills-container">
        {skillGroups.map((group) => (
          <div className="skill-card" key={group.title}>
            <h3>{group.title}</h3>
            <div className="skill-items">
              {group.skills.map(([name, icon]) => (
                <div className="skill" key={name}>
                  {icon ? (
                    <img src={`https://simpleicons.org/icons/${icon}.svg`} alt="" />
                  ) : (
                    <span className="skill-icon-placeholder" aria-hidden="true">AOS</span>
                  )}
                  <h5>{name}</h5>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
