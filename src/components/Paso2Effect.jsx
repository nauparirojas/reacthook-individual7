import { useState, useEffect } from 'react';

export default function Paso2Effect() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    
    fetch('https://jsonplaceholder.typicode.com/todos/1', { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();
  }, []);

  return (
    <div style={cardStyle}>
      <span style={badgeStyle}>Paso 2</span>
      <h3 style={titleStyle}>useEffect con Cleanup y AbortController</h3>
      {loading ? (
        <p style={{color: '#6b7280'}}>Sincronizando con API externa...</p>
      ) : (
        <div style={boxStyle}>
          <p style={{margin: 0}}><strong>Título de Tarea:</strong> {data?.title}</p>
        </div>
      )}
    </div>
  );
}