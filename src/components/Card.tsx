

import React from 'react';

type CardProps = {
  title: string;
  description: string;
  onReadMore?: () => void;
  isSelected?: boolean;  // Add this prop
};

const Card: React.FC<CardProps> = ({ title, description, onReadMore, isSelected }) => {
  return (
    <div
      style={{
        ...styles.card,
        backgroundColor: isSelected ? '#e0e0ff' : '#fff', // Highlight if selected
        transform: isSelected ? 'scale(1.02)' : 'none',   // Slight scale up if selected
        boxShadow: isSelected
          ? '0 6px 12px rgba(0,0,0,0.15)'
          : '0 4px 8px rgba(0,0,0,0.05)',
      }}
    >
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      {onReadMore && (
        <button style={styles.button} onClick={onReadMore}>
          Read More
        </button>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.2rem',
  },
  description: {
    color: '#555',
    fontSize: '0.95rem',
  },
  button: {
    marginTop: '0.75rem',
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Card;
