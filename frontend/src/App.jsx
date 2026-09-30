import { useEffect, useState } from 'react';
import Navigation from './components/Navigation.jsx';
import ChatBot from './components/ChatBot.jsx';

import About from './sections/about.jsx';
import Skills from './sections/skills.jsx';
import Education from './sections/education.jsx';
import Portfolio from './sections/portfolio.jsx';
import Experience from './sections/experience.jsx';
import Contact from './sections/contact.jsx';

function Sidebar({ lightMode, onThemeToggle, isOpen }) {
  return (
    <aside id="portfolio-sidebar" className={`sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="profile">
        <h2>SHIKHAR PARIHAR</h2>
        <p>MERN FULL STACK DEVELOPER</p>
      </div>

      <div className="contact">
        <div className="contact-item">
          <h3 className="label">Email</h3>
          <a href="mailto:pariharshikhar101@gmail.com" className="value">
            pariharshikhar101@gmail.com
          </a>
        </div>
        <div className="contact-item">
          <h3 className="label">Phone</h3>
          <a href="tel:6232553367" className="value">6232553367</a>
        </div>
        <div className="contact-item">
          <h3 className="label">Location</h3>
          <p className="value">Satna, India</p>
        </div>
      </div>

      <div className="social">
        <h2>CONNECT WITH ME</h2>
        <div className="social-links">
          <a href="https://www.instagram.com/parihar_shikhar26/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="https://simpleicons.org/icons/instagram.svg" alt="" />
          </a>
          <a href="https://www.linkedin.com/in/shikhar-parihar-09998928a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCryoEYnLAtMsCjSZpksu0lUTCld65EbuWVm9iSEYBj-eRoR2fpAq0zIrC&s=10"
              alt=""
            />
          </a>
          <a href="https://github.com/Shikhar2004Parihar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="https://simpleicons.org/icons/github.svg" alt="" />
          </a>
        </div>
      </div>

      <button
        id="themeToggle"
        className="theme-toggle"
        type="button"
        onClick={onThemeToggle}
        aria-pressed={lightMode}
      >
        <span aria-hidden="true">{lightMode ? '☾' : '☀'}</span>
        <span>{lightMode ? 'Dark Mode' : 'Light Mode'}</span>
      </button>
    </aside>
  );
}

export default function App() {
  const [lightMode, setLightMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sectionToScroll, setSectionToScroll] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('light-mode', lightMode);
  }, [lightMode]);

  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach((element) => element.classList.add('show'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    animatedElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionToScroll) {
      return;
    }

    document.getElementById(sectionToScroll)?.scrollIntoView({ behavior: 'smooth' });
    setSectionToScroll(null);
  }, [sectionToScroll]);

  useEffect(() => {
    const syncViewFromLocation = () => {
      const target = window.location.hash.slice(1);
      setSectionToScroll(target || null);
    };

    window.addEventListener('popstate', syncViewFromLocation);
    return () => window.removeEventListener('popstate', syncViewFromLocation);
  }, []);

  const handleNavigation = (event, target) => {
    event.preventDefault();
    window.history.pushState(null, '', `#${target}`);
    setSectionToScroll(target);
  };

  return (
    <div className="main-container">
      <div className="mobile-header">
        <button
          className="sidebar-toggle"
          type="button"
          onClick={() => setIsSidebarOpen((current) => !current)}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isSidebarOpen}
          aria-controls="portfolio-sidebar"
        >
          <span />
          <span />
          <span />
        </button>
        <span className="mobile-header-name">SHIKHAR PARIHAR</span>
      </div>
      <Sidebar
        lightMode={lightMode}
        onThemeToggle={() => setLightMode((current) => !current)}
        isOpen={isSidebarOpen}
      />

      <main className="main-content">
        <Navigation onNavigate={handleNavigation} />

        <div>
          <About />
          <Skills />
          <Education />
          <Portfolio />
          <Experience />
          <Contact />

          <footer>
            <p>© 2026 Shikhar Parihar. All Rights Reserved.</p>
          </footer>
        </div>

      </main>

      <ChatBot />
    </div>
  );
}