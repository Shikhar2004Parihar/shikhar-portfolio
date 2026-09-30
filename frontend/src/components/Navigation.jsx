const navigationItems = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Education', target: 'education' },
  { label: 'Portfolio', target: 'portfolio' },
  { label: 'Experience', target: 'experience' },
  { label: 'Contact', target: 'contact' },
];

export default function Navigation({ onNavigate }) {
  return (
    <header className="navigation">
      <nav aria-label="Main navigation">
        {navigationItems.map(({ label, target }) => (
          <a href={`#${target}`} key={target} onClick={(event) => onNavigate(event, target)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
