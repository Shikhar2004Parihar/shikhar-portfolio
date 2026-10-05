import { useState } from 'react';
import { readApiResponse } from '../utils/api';

const API_URL = "";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionFailed, setSubmissionFailed] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    setIsSubmitting(true);
    setSubmissionMessage('');
    setSubmissionFailed(false);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      await readApiResponse(response);

      form.reset();
      setSubmissionMessage('Your message was sent successfully.');
    } catch (error) {
      setSubmissionFailed(true);
      setSubmissionMessage(error.message || 'Unable to submit your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="contact-section animate-on-scroll">
      <div className="contact-container">
        <div className="contact-heading">
          <span>GET IN TOUCH</span>
          <h2>Contact Me</h2>
          <p>
            Have a project in mind or want to discuss an opportunity?
            Fill out the form below and I&apos;ll get back to you.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter your contact number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Details</label>
            <textarea
              id="details"
              name="details"
              rows="6"
              placeholder="Tell me about your project..."
              required
            />
          </div>
          <button type="submit" className="contact-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
          {submissionMessage && (
            <p className="contact-form-message" role="status" aria-live="polite" data-error={submissionFailed}>
              {submissionMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
