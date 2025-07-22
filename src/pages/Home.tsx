import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaLaptopCode } from 'react-icons/fa';

interface Ripple {
  x: number;
  y: number;
  key: number;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleKey = useRef(0);

  const handleRipple = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = rect.width;

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = { x, y, key: rippleKey.current++ };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => setRipples([]), 500); // Clear after animation

    setTimeout(() => navigate(path), 150); // Navigate after short delay
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Our Knowledge Hub</h1>
      <p style={styles.subheading}>
        Dive into curated tutorials and insightful blogs to boost your development skills.
      </p>

      <div style={styles.sections}>
        <div
          style={styles.card}
          onClick={(e) => handleRipple(e, '/tutorials')}
        >
          <div style={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1752867494500-9ea9322f58c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3OXx8fGVufDB8fHx8fA%3D%3D"
              alt="Tutorials"
              style={styles.cardImage}
            />
            <FaLaptopCode style={styles.iconOverlay} />
          </div>
          <h2 style={styles.cardTitle}>Explore Tutorials</h2>
          <p style={styles.cardText}>
            Hands-on guides to help you master web development, JavaScript, TypeScript, and more.
          </p>
          {ripples.map((ripple) => (
            <span
              key={ripple.key}
              style={{
                ...styles.ripple,
                left: ripple.x,
                top: ripple.y,
              }}
            />
          ))}
        </div>

        <div
          style={styles.card}
          onClick={(e) => handleRipple(e, '/blogs')}
        >
          <div style={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1752805252779-000e9d493b1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4Nnx8fGVufDB8fHx8fA%3D%3D"
              alt="Blogs"
              style={styles.cardImage}
            />
            <FaBookOpen style={styles.iconOverlay} />
          </div>
          <h2 style={styles.cardTitle}>Read Our Blog</h2>
          <p style={styles.cardText}>
            Stay updated with the latest trends, tips, and thoughts from the development world.
          </p>
          {ripples.map((ripple) => (
            <span
              key={ripple.key}
              style={{
                ...styles.ripple,
                left: ripple.x,
                top: ripple.y,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '2rem',
  },
  sections: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'center',
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    flex: '1 1 300px',
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    textAlign: 'left',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: '1rem',
  },
  cardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  iconOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '2.5rem',
    opacity: 0.9,
    textShadow: '0 2px 6px rgba(0,0,0,0.5)',
    pointerEvents: 'none',
  },
  cardTitle: {
    fontSize: '1.4rem',
    marginBottom: '0.5rem',
  },
  cardText: {
    fontSize: '1rem',
    color: '#444',
  },
  ripple: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    animation: 'ripple 0.6s linear',
    pointerEvents: 'none',
    transform: 'scale(0)',
  },
};

// Add ripple keyframes globally (for ripple animation)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`, styleSheet.cssRules.length);

export default Home;
