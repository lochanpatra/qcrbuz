import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';


const Navbar: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <HamburgerMenu />
      </div>

      <div style={styles.center}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/blogs" style={styles.link}>Blogs</Link>
        <Link to="/tutorials" style={styles.link}>Tutorials</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </div>

      
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ddd',
  },
  left: {
    flex: '0 0 auto',
  },
  center: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  right: {
    flex: '0 0 auto',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 500,
    fontSize: '1rem',
  },
};

export default Navbar;
