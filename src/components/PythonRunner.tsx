import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    loadPyodide?: (options?: any) => Promise<any>;
  }
}

interface PythonRunnerProps {
  code: string;
}

const PythonRunner: React.FC<PythonRunnerProps> = ({ code }) => {
  const [pyodide, setPyodide] = useState<any>(null);
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (!window.loadPyodide) {
          throw new Error('Pyodide not loaded - window.loadPyodide missing.');
        }
        const py = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
        });
        setPyodide(py);
      } catch (err: any) {
        setError(err.message || 'Failed to load Pyodide');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!pyodide) return;

    async function runCode() {
      setOutput('');
      setError(null);
      try {
        pyodide.setStdout({
          batched: (s: string) => setOutput((out) => out + s),
        });
        pyodide.setStderr({
          batched: (s: string) => setOutput((out) => out + s),
        });
        await pyodide.runPythonAsync(code);
      } catch (err: any) {
        setError(err.message || 'Error running Python code');
      }
    }

    runCode();
  }, [pyodide, code]);

  return (
    <div
      style={{
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        padding: '1rem',
        borderRadius: '8px',
        fontFamily: 'monospace',
        minHeight: '150px',
        whiteSpace: 'pre-wrap',
        overflowY: 'auto',
        marginTop: '1rem',
      }}
    >
      {loading && <div>Loading Python runtime...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!loading && !error && output === '' && <div>Running...</div>}
      {!loading && !error && output !== '' && <pre>{output}</pre>}
    </div>
  );
};

export default PythonRunner;
