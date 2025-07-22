import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    alert('Message submitted. We’ll be in touch soon!');
  };

  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>Send a Message</h2>
      <p style={styles.description}>
        Have questions or suggestions? We’d love to hear from you.
      </p>

      <form
        action="https://formspree.io/f/mvgadnda"
        method="POST"
        onSubmit={handleSubmit}
        style={styles.form}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '4rem 2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  description: {
    textAlign: 'center',
    color: '#555',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Contact;
