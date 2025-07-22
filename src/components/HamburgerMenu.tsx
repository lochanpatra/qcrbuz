// import React, { useState } from 'react';

// const HamburgerMenu: React.FC = () => {
//   const [open, setOpen] = useState(false);

//   const toggleMenu = () => {
//     setOpen(prev => !prev);
//   };

//   return (
//     <div style={styles.wrapper}>
//       <button onClick={toggleMenu} style={styles.button}>
//         ☰
//       </button>

//       {open && (
//         <div style={styles.menu}>
//           <a href="/" style={styles.link}>Home</a>
//           <a href="/about" style={styles.link}>About</a>
//           <a href="/blogs" style={styles.link}>Blogs</a>
//           <a href="/tutorials" style={styles.link}>Tutorials</a>
//           <a href="/contact" style={styles.link}>Contact</a>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles: { [key: string]: React.CSSProperties } = {
//   wrapper: {
//     position: 'relative',
//   },
//   button: {
//     fontSize: '1.5rem',
//     background: 'transparent',
//     border: 'none',
//     cursor: 'pointer',
//   },
//   menu: {
//     position: 'absolute',
//     top: '2.5rem',
//     left: 0,
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     borderRadius: '6px',
//     padding: '0.5rem',
//     zIndex: 1000,
//   },
//   link: {
//     display: 'block',
//     padding: '0.5rem 1rem',
//     color: '#333',
//     textDecoration: 'none',
//     fontSize: '0.95rem',
//   },
// };

// export default HamburgerMenu;

import React, { useState, useEffect, useRef } from 'react';

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div style={styles.wrapper} ref={menuRef}>
      <span style={styles.siteName}>TechBuzz</span>
      <button onClick={toggleMenu} style={styles.button} aria-label="Toggle menu">
        ☰
      </button>

      {open && (
        <div style={{ ...styles.menu }}>
          <a href="/" style={styles.link}>Home</a>
          <a href="/about" style={styles.link}>About</a>
          <a href="/blogs" style={styles.link}>Blogs</a>
          <a href="/tutorials" style={styles.link}>Tutorials</a>
          <a href="/contact" style={styles.link}>Contact</a>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  siteName: {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#333',
  },
  button: {
    fontSize: '1.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  menu: {
    position: 'absolute',
    top: '2.5rem',
    left: 0,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '6px',
    padding: '0.5rem 0',
    zIndex: 1000,
    minWidth: '150px',
  },
  link: {
    display: 'block',
    padding: '0.6rem 1rem',
    color: '#333',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
};

export default HamburgerMenu;
