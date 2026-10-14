import { useState } from 'react';

export default function Paso1Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={cardStyle}>
      <span style={badgeStyle}>Paso 1</span>
      <h3 style={titleStyle}>Ciclo de Render y useState</h3>
      <p style={textStyle}>Valor actual del estado: <strong style={{color: '#2563eb'}}>{count}</strong></p>
      {/* IA: [Sintaxis de actualización de estado] → Solución manual: Uso función callback para asegurar el estado anterior */}
      <button style={buttonStyle} onClick={() => setCount((prev) => prev + 1)}>
        Incrementar +1
      </button>
    </div>
  );
}