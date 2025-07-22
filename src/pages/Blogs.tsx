import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import RippleWrapper from '../components/RippleWrapper'; // Adjust path as needed

type Blog = {
  id: string;
  title: string;
  description: string;
  content: string;
};

const blogData: Blog[] = [
  {
  id: '1',
  title: 'Deep Learning in Agriculture',
  description: 'Explore how deep learning is transforming the agriculture industry.',
  content: `
## AI Meets Agriculture

Deep learning is revolutionizing agriculture by introducing intelligent solutions for crop monitoring, yield prediction, and pest detection.

## Crop Monitoring

- Satellite and drone imagery analyzed using CNNs
- Detect plant health issues early
- Enable precision farming practices

## Yield Prediction

- Analyze historical weather, soil, and crop data
- LSTM models forecast future yields accurately
- Helps optimize resource allocation

## Pest & Disease Detection

- Train models on leaf images to spot infestations
- Classify crop diseases with high accuracy
- Reduces reliance on manual inspections

## Future Outlook

Deep learning enables scalable, data-driven decisions in agriculture. As sensor data and computing power grow, AI will become a core tool in feeding a growing global population.
  `,
},
  {
  id: '2',
  title: 'Urbanization and Global Warming',
  description: 'Understand how rapid urban growth contributes directly to climate change.',
  content: `
## The Urbanization Boom

As more people migrate to cities, urban areas are expanding rapidly — but at what environmental cost?

## Heat Islands

- Dense cities trap heat due to concrete and asphalt
- Temperatures in urban areas can be 3–7°F higher than rural zones
- Increased energy demand for cooling worsens emissions

## Transportation & Emissions

- Urban sprawl increases vehicle use
- More fossil fuels burned = more CO₂ released
- Traffic congestion further amplifies air pollution

## Deforestation & Land Use

- Forests cleared to make way for housing and infrastructure
- Loss of carbon sinks accelerates atmospheric CO₂ buildup
- Natural ecosystems are disrupted

## Resource Consumption

- Cities consume over 75% of global energy
- Heavy reliance on fossil fuels for electricity and industry
- Urban waste and water use strain local environments

## Moving Forward

Smart urban planning, green infrastructure, and renewable energy adoption are key to mitigating the climate impact of growing cities. Urbanization doesn’t have to mean warming — but without change, it’s a dangerous trend.
  `,
},



  {
    id: '3',
    title: 'TypeScript for Beginners',
    description: 'How to add type safety to your JavaScript projects using TypeScript.',
    content: `
## Why TypeScript?

TypeScript helps catch errors early and improves developer productivity.

## Topics Covered

- Installing TypeScript
- Basic types and interfaces
- Using TypeScript with React
    `,
  },
];

const Blogs: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>(id || '1');

  useEffect(() => {
    if (id && id !== selectedId) {
      setSelectedId(id);
    }
  }, [id, selectedId]);

  const selectedBlog = blogData.find((b) => b.id === selectedId);

  if (!selectedBlog) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Blog post not found.</h2>
        <button onClick={() => navigate('/blogs')}>← Back to Blogs</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem 2rem',
          overflowY: 'auto',
          borderRight: '1px solid #ccc',
        }}
      >
        <section style={{ marginBottom: '2rem' }}>
          <h1>{selectedBlog.title}</h1>
          <div style={{ lineHeight: '1.6', color: '#333', fontSize: '1rem' }}>
            {renderFormattedContent(selectedBlog.content)}
          </div>
        </section>

        <section style={{ flex: 1, overflowY: 'auto' }}>
          {blogData.map((blog) => (
            <Card
              key={blog.id}
              title={blog.title}
              description={blog.description}
              onReadMore={() => {
                setSelectedId(blog.id);
                navigate(`/blogs/${blog.id}`);
              }}
              isSelected={blog.id === selectedId}
            />
          ))}
        </section>
      </main>

      {/* Sidebar */}
      <aside
        style={{
          width: '280px',
          padding: '1rem',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2 style={{ marginTop: 0 }}>All Blog Posts</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {blogData.map((blog) => (
            <li key={blog.id} style={{ marginBottom: '0.5rem' }}>
              <RippleWrapper
                onClick={() => {
                  setSelectedId(blog.id);
                  navigate(`/blogs/${blog.id}`);
                }}
                style={{
                  display: 'block',
                  padding: '0.5rem',
                  backgroundColor: blog.id === selectedId ? '#ddd' : 'transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  fontWeight: blog.id === selectedId ? 600 : 400,
                }}
              >
                <span style={{ display: 'inline-block', width: '100%', userSelect: 'none' }}>
                  {blog.title}
                </span>
              </RippleWrapper>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Blogs;

// Helper to format content
const renderFormattedContent = (raw: string): React.ReactNode => {
  const lines = raw.trim().split('\n');

  const content: React.ReactNode[] = [];
  let listItems: string[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ')) {
      if (listItems.length) {
        content.push(
          <ul key={`ul-${index}`} style={{ paddingLeft: '1.2rem' }}>
            {listItems.map((item, i) => (
              <li key={`li-${index}-${i}`} style={{ marginBottom: '0.3rem' }}>
                {item}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }

      content.push(
        <h2
          key={`h2-${index}`}
          style={{ marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.3rem' }}
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
    } else if (trimmed) {
      if (listItems.length) {
        content.push(
          <ul key={`ul-${index}`} style={{ paddingLeft: '1.2rem' }}>
            {listItems.map((item, i) => (
              <li key={`li-${index}-${i}`} style={{ marginBottom: '0.3rem' }}>
                {item}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }

      content.push(
        <p key={`p-${index}`} style={{ marginBottom: '1rem', color: '#444' }}>
          {trimmed}
        </p>
      );
    }
  });

  if (listItems.length) {
    content.push(
      <ul key="ul-final" style={{ paddingLeft: '1.2rem' }}>
        {listItems.map((item, i) => (
          <li key={`li-final-${i}`} style={{ marginBottom: '0.3rem' }}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return content;
};
