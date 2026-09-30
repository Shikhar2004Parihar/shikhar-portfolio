import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SectionHeading from '../components/SectionHeading.jsx';
import sportsBanner from '../assets/mycanvadesigns/sportsBanner.jpeg';
import universityGameBanner from '../assets/mycanvadesigns/univesitylevelGameBanner.jpeg';
import universityGameBannerAlt from '../assets/mycanvadesigns/UnivesityLevelgameBanner (2).jpeg';
import artEvent from '../assets/mycanvadesigns/artEvent.jpeg';
import hindiEvent from '../assets/mycanvadesigns/hindiEvent.jpeg';
import invitationCard from '../assets/mycanvadesigns/invitationCard.jpeg';
import restaurantMenu from '../assets/mycanvadesigns/restaurantMenu.jpeg';
import scienceEvent from '../assets/mycanvadesigns/scienceEvent.jpeg';


const designTools = ['Canva', 'Adobe Photoshop', 'Figma'];

const designSamples = [
  { title: 'Sports banner', src: sportsBanner },
  { title: 'University-level game banner', src: universityGameBanner },
  { title: 'University-level game banner, alternate', src: universityGameBannerAlt },
  { title: 'Art event', src: artEvent },
  { title: 'Hindi event', src: hindiEvent },
  { title: 'Invitation card', src: invitationCard },
  { title: 'Restaurant menu', src: restaurantMenu },
  { title: 'Science event', src: scienceEvent },

];

export default function Experience() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeDesign, setActiveDesign] = useState(0);
  const watchButtonRef = useRef(null);

  useEffect(() => {
    if (!viewerOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setActiveDesign((current) => (current + 1) % designSamples.length);
      } else if (event.key === 'ArrowLeft') {
        setActiveDesign((current) => (current - 1 + designSamples.length) % designSamples.length);
      } else if (event.key === 'Escape') {
        setViewerOpen(false);
        watchButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewerOpen]);

  function changeDesign(direction) {
    setActiveDesign((current) => (current + direction + designSamples.length) % designSamples.length);
  }

  function closeViewer() {
    setViewerOpen(false);
    watchButtonRef.current?.focus();
  }

  const currentDesign = designSamples[activeDesign];

  return (
    <>
      <section id="experience" className="section experience-section animate-on-scroll">
        <SectionHeading eyebrow="CREATIVE EXPERIENCE">
          My <span>Experience</span>
        </SectionHeading>

        <div className="experience-layout">
          <div className="experience-copy">
            <div className="experience-title-row">
              <h2>Graphic Designer</h2>
              <span className="experience-type">Freelance</span>
            </div>
            <p className="experience-description">
              I work as a freelance graphic designer, helping clients bring their ideas to life
              primarily using Canva. Over the years, I&apos;ve created more than 300 custom designs
              and edited over 50 videos for a huge mix of everyday needs—everything from
              eye-catching school advertisement banners and promotional videos to clean resumes,
              elegant invitation cards, and official certificates.
            </p>

            <div className="experience-tools">
              <span className="experience-tools-label">TOOLS I USE</span>
              <ul aria-label="Graphic design tools">
                {designTools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>

            <button
              ref={watchButtonRef}
              className="experience-gallery-trigger"
              type="button"
              onClick={() => setViewerOpen(true)}
              aria-haspopup="dialog"
              aria-controls="design-viewer"
            >
              Watch designs
              <span aria-hidden="true">&#8599;</span>
            </button>
          </div>

          <aside className="experience-stats" aria-label="Design work highlights">
            <span className="experience-stats-label">A FEW NUMBERS</span>
            <div className="experience-stat">
              <strong>300<span>+</span></strong>
              <p>custom designs</p>
            </div>
            <div className="experience-stat">
              <strong>50<span>+</span></strong>
              <p>videos edited</p>
            </div>
            <p className="experience-process">IDEA <span aria-hidden="true">/</span> DESIGN <span aria-hidden="true">/</span> DELIVERY</p>
          </aside>
        </div>
      </section>

      {viewerOpen && createPortal(
        <div
          className="design-viewer-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeViewer();
          }}
        >
          <div
            className="design-viewer"
            id="design-viewer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="design-viewer-title"
          >
            <div className="design-viewer-header">
              <div>
                <span className="design-viewer-eyebrow">SELECTED WORK</span>
                <h2 id="design-viewer-title">Design showcase</h2>
              </div>
              <button className="design-viewer-close" type="button" onClick={closeViewer} aria-label="Close designs">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="design-carousel">
              <button
                className="design-carousel-arrow"
                type="button"
                onClick={() => changeDesign(-1)}
                aria-label="Previous design"
              >
                <span aria-hidden="true">&#8592;</span>
              </button>
              <figure className="design-slide" aria-live="polite">
                <img key={currentDesign.src} src={currentDesign.src} alt={currentDesign.title} />
                <figcaption>{currentDesign.title}</figcaption>
              </figure>
              <button
                className="design-carousel-arrow"
                type="button"
                onClick={() => changeDesign(1)}
                aria-label="Next design"
              >
                <span aria-hidden="true">&#8594;</span>
              </button>
            </div>

            <div className="design-viewer-footer">
              <div className="design-slide-picker" aria-label="Choose a design">
                {designSamples.map((design, index) => (
                  <button
                    className={index === activeDesign ? 'active' : ''}
                    key={design.src}
                    type="button"
                    onClick={() => setActiveDesign(index)}
                    aria-label={`Show design ${index + 1}: ${design.title}`}
                    aria-pressed={index === activeDesign}
                  />
                ))}
              </div>
              <p className="design-slide-count">{activeDesign + 1} <span>/</span> {designSamples.length}</p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}