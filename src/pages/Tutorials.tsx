//======================================
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import RippleWrapper from '../components/RippleWrapper';

type Tutorial = {
  id: string;
  title: string;
  description: string;
  content: string;
  codeSamples?: {
    [lang: string]: string;
  };
};

const tutorialData: Tutorial[] = [
  {
    id: '1',
    title: 'Live HTML/CSS/JS Editor',
    description: 'Edit and preview HTML/CSS/JavaScript in real time.',
    content: `## Live Code Editor\n\nTest out your code instantly.`,
    codeSamples: {
      HTML: `<h1 id="welcome">Welcome!</h1>`,
      CSS: `h1 { color: green; text-align: center; }`,
      JavaScript: `document.getElementById('welcome').textContent += " 🎉";`,
    },
  },
  {
    id: '2',
    title: '1.Basic Leaflet Map',
    description: 'Create a simple interactive map.',
    content: `## Leaflet Basics\n\nAdd a map and set the view.`,
    codeSamples: {
      HTML: `<div id="map"></div>`,
      CSS: `#map { height: 400px; width: 100%; }`,
      JavaScript: `
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
      `.trim(),
    },
  },
  {
    id: '3',
    title: '2.Add Markers and Popups',
    description: 'Learn how to add markers, circles, and polygons.',
    content: `## Markers & Shapes\n\nUse markers and shapes with popup messages.`,
    codeSamples: {
       HTML: `<div id="map"></div>`,
      CSS: `#map { height: 400px; width: 100%; }`,
      JavaScript: `
L.marker([51.5, -0.09]).addTo(map).bindPopup("Hello!");
L.circle([51.508, -0.11], { color: 'red', radius: 500 }).addTo(map);
      `.trim(),
    },
  },
  {
    id: '4',
    title: '3.Handle Map Click Events',
    description: 'Respond to user interactions on the map.',
    content: `## Events\n\nCapture user clicks to show popups.`,
    codeSamples: {
       HTML: `<div id="map"></div>`,
      CSS: `#map { height: 400px; width: 100%; }`,
      JavaScript: `
map.on('click', function(e) {
  L.popup()
    .setLatLng(e.latlng)
    .setContent("You clicked at " + e.latlng.toString())
    .openOn(map);
});
      `.trim(),
    },
  },
  {
    id: '5',
    title: '4.Use Geolocation',
    description: "Center the map on the user's location.",
    content: `## Geolocation\n\nFind and display the user’s current location.`,
    codeSamples: {
       HTML: `<div id="map"></div>`,
      CSS: `#map { height: 400px; width: 100%; }`,
      JavaScript: `
map.locate({ setView: true, maxZoom: 16 });
map.on('locationfound', (e) => {
  L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
});
      `.trim(),
    },
  },
  {
    id: '6',
    title: '5.Add Custom Icons',
    description: 'Use your own icons in place of default ones.',
    content: `## Custom Markers\n\nUse custom images as markers.`,
    codeSamples: {
       HTML: `<div id="map"></div>`,
      CSS: `#map { height: 400px; width: 100%; }`,
      JavaScript: `
const myIcon = L.icon({ iconUrl: 'icon.png', iconSize: [32, 32] });
L.marker([51.5, -0.09], { icon: myIcon }).addTo(map);
      `.trim(),
    },
      },
      {
  id: '7',
  title: 'Python Machine Learning Example',
  description: 'Basic Python ML code using scikit-learn.',
  content: `
## Python ML Example

This tutorial shows how to train a simple Logistic Regression classifier using scikit-learn.

Note: This is static code; Python cannot run directly in this live editor.
  `,
  codeSamples: {
    Python: `
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

# Predict and evaluate
predictions = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, predictions))
    `.trim(),
  },
}
];

const Tutorials: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>(id || '1');

  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  const selectedTutorial = tutorialData.find((t) => t.id === selectedId);

  useEffect(() => {
    if (id && id !== selectedId) {
      setSelectedId(id);
    }

    const tut = tutorialData.find((t) => t.id === id || selectedId);
    if (tut?.codeSamples) {
      setHtmlCode(tut.codeSamples['HTML'] || '');
      setCssCode(tut.codeSamples['CSS'] || '');
      setJsCode(tut.codeSamples['JavaScript'] || '');
    } else {
      setHtmlCode('');
      setCssCode('');
      setJsCode('');
    }
  }, [id, selectedId]);

  if (!selectedTutorial) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Tutorial not found.</h2>
        <button onClick={() => navigate('/tutorials')}>← Back to Tutorials</button>
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
          <h1>{selectedTutorial.title}</h1>
          <div style={{ lineHeight: '1.6', color: '#333', fontSize: '1rem' }}>
            {renderFormattedContent(selectedTutorial.content)}
          </div>

          {/* Static Code Samples */}
          {selectedTutorial.codeSamples && (
            <div style={{ marginTop: '2rem' }}>
              <h2>Code Samples</h2>
              {Object.entries(selectedTutorial.codeSamples).map(([lang, code]) => (
                <div key={lang} style={{ marginBottom: '1rem' }}>
                  <h3>{lang}</h3>
                  <pre
                    style={{
                      backgroundColor: '#f4f4f4',
                      padding: '1rem',
                      borderRadius: '6px',
                      overflowX: 'auto',
                    }}
                  >
                    <code>{code.trim()}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Live Editor */}
          {(htmlCode || cssCode || jsCode) && (
            <div style={{ marginTop: '2rem' }}>
              <h2>Live Code Editor & Preview</h2>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <h4>HTML</h4>
                  <textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    style={{ width: '100%', height: '100px', fontFamily: 'monospace' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h4>CSS</h4>
                  <textarea
                    value={cssCode}
                    onChange={(e) => setCssCode(e.target.value)}
                    style={{ width: '100%', height: '100px', fontFamily: 'monospace' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h4>JavaScript</h4>
                  <textarea
                    value={jsCode}
                    onChange={(e) => setJsCode(e.target.value)}
                    style={{ width: '100%', height: '100px', fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              <iframe
                srcDoc={buildLivePreviewSrcDoc(htmlCode, cssCode, jsCode)}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  height: '400px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                }}
                sandbox="allow-scripts allow-same-origin"
                title="Live Editor Preview"
              />
            </div>
          )}
        </section>

        {/* Scrollable tutorial list */}
        <section style={{ flex: 1, overflowY: 'auto' }}>
          {tutorialData.map((tut) => (
            <RippleWrapper
              key={tut.id}
              onClick={() => {
                setSelectedId(tut.id);
                navigate(`/tutorials/${tut.id}`);
              }}
              style={{ display: 'block', borderRadius: 12 }}
            >
              <Card
                title={tut.title}
                description={tut.description}
                isSelected={tut.id === selectedId}
              />
            </RippleWrapper>
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
        <h2 style={{ marginTop: 0 }}>All Tutorials</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tutorialData.map((tut) => (
            <li key={tut.id} style={{ marginBottom: '0.5rem' }}>
              <RippleWrapper
                onClick={() => {
                  setSelectedId(tut.id);
                  navigate(`/tutorials/${tut.id}`);
                }}
                style={{
                  display: 'block',
                  padding: '0.5rem',
                  backgroundColor: tut.id === selectedId ? '#ddd' : 'transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: tut.id === selectedId ? 600 : 400,
                }}
              >
                <span style={{ userSelect: 'none' }}>{tut.title}</span>
              </RippleWrapper>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Tutorials;

// Util: Format markdown-like text
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
              <li key={`li-${index}-${i}`}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
      content.push(
        <h2
          key={`h2-${index}`}
          style={{
            marginTop: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '0.3rem',
          }}
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
              <li key={`li-${index}-${i}`}>{item}</li>
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
      <ul key={`ul-final`} style={{ paddingLeft: '1.2rem' }}>
        {listItems.map((item, i) => (
          <li key={`li-final-${i}`}>{item}</li>
        ))}
      </ul>
    );
  }

  return content;
};

// Build live preview iframe srcDoc with conditional Leaflet loading and no integrity attribute
const buildLivePreviewSrcDoc = (html: string, css: string, js: string) => {
  const needsLeaflet = js.includes('L.');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${needsLeaflet ? `
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    crossorigin=""
  />
  <style>
    #map { height: 400px; width: 100%; margin: 0; padding: 0; }
    body, html { margin: 0; padding: 0; height: 100%; }
  </style>
  ` : ''}
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}

  <script>
    function runUserCode() {
      try {
        ${js}
      } catch (error) {
        document.body.innerHTML += '<pre style="color: red; white-space: pre-wrap;">' + error.message + '</pre>';
      }
    }

    ${needsLeaflet ? `
    var leafletScript = document.createElement('script');
    leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    leafletScript.crossOrigin = "";
    leafletScript.onload = runUserCode;
    document.head.appendChild(leafletScript);
    ` : `
    document.addEventListener('DOMContentLoaded', runUserCode);
    `}
  </script>
</body>
</html>
  `;
};



















