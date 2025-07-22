import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} TechBuzz. All rights reserved.</p>
      <div style={styles.links}>
        <Link to="/privacy-policy" style={styles.link}>
          Privacy Policy
        </Link>
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <Link to="/terms" style={styles.link}>
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    marginTop: '2rem',
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
    color: '#333',
    borderTop: '1px solid #e0e0e0',
    fontSize: '0.9rem',
  },
  links: {
    marginTop: '0.5rem',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Footer;
