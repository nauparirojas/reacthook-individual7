import { useState, useEffect } from 'react';

function useMyFetch(url) {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        setLoading(false);
      });
  }, [url]);
  return { info, loading };
}

export default function Paso5CustomHook() {
  const { info, loading } = useMyFetch('https://jsonplaceholder.typicode.com/users/1');

  return (
    <div style={cardStyle}>
      <span style={badgeStyle}>Paso 5</span>
      <h3 style={titleStyle}>Hook Personalizado (useFetch)</h3>
      {loading ? (
        <p style={{color: '#6b7280'}}>Cargando usuario...</p>
      ) : (
        <div style={boxStyle}>
          <p style={{margin: '4px 0'}}><strong>Nombre:</strong> {info?.name}</p>
          <p style={{margin: '4px 0'}}><strong>Email:</strong> {info?.email}</p>
        </div>
      )}
    </div>
  );
}