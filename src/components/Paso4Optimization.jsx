import { useState, useMemo, useCallback, useRef } from 'react';

export default function Paso4Optimization() {
  const [num, setNum] = useState(0);
  const inputRef = useRef(null);

  const expensiveCalculation = useMemo(() => {
    let total = 0;
    for (let i = 0; i < 1000000; i++) total += num;
    return total;
  }, [num]);

  const handleFocus = useCallback(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={cardStyle}>
      <span style={badgeStyle}>Paso 4</span>
      <h3 style={titleStyle}>Optimización (useMemo, useCallback, useRef)</h3>
      
      <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px'}}>
        <input ref={inputRef} type="text" placeholder="Escribe aquí..." style={inputStyle} />
        <button style={secondaryButtonStyle} onClick={handleFocus}>Enfocar Input</button>
      </div>

      <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '10px'}}>
        <button style={buttonStyle} onClick={() => setNum((p) => p + 1)}>Incrementar Número: {num}</button>
        <p style={textStyle}>Cálculo optimizado (useMemo): <strong>{expensiveCalculation}</strong></p>
      </div>
    </div>
  );
}