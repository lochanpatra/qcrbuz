import React from 'react';

const About: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to our website! We are passionate about sharing knowledge through detailed blogs and hands-on tutorials. Whether you're a beginner or an experienced developer, you'll find valuable content tailored to your journey.
      </p>
      <p style={styles.paragraph}>
        Our mission is to provide high-quality, easy-to-understand resources on web development, programming, and modern technologies. Everything we publish is designed to help you grow and succeed in your career or hobby.
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
    color: '#444',
  },
};

export default About;
