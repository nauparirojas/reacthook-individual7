import { useState, createContext, useContext, useEffect, useMemo, useCallback, useRef } from 'react';

// Contexto Global
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Paso 1
function Paso1Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px', color: '#000' }}>
      <h3>Paso 1: Ciclo de Render y useState</h3>
      <p>Contador: <strong>{count}</strong></p>
      {/* IA: [Sintaxis de actualización de estado] → Solución manual: Uso función callback para asegurar el estado anterior */}
      <button onClick={() => setCount((p) => p + 1)} style={{ padding: '8px 12px', marginTop: '8px', cursor: 'pointer' }}>Incrementar</button>
    </div>
  );
}

// Paso 2
function Paso2Effect() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://jsonplaceholder.typicode.com/todos/1', { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => { if (err.name !== 'AbortError') console.error(err); });
    return () => controller.abort();
  }, []);
  return (
    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px', color: '#000' }}>
      <h3>Paso 2: useEffect con Cleanup y AbortController</h3>
      <p>Título: {data ? data.title : 'Cargando...'}</p>
    </div>
  );
}

// Paso 3
function Paso3ContextConsumer() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
      <h3>Paso 3: useContext (Tema Global)</h3>
      <p>Tema actual: {theme}</p>
      <button onClick={toggleTheme} style={{ padding: '8px 12px', marginTop: '8px', cursor: 'pointer' }}>Cambiar Tema</button>
    </div>
  );
}

// Paso 4
function Paso4Optimization() {
  const [num, setNum] = useState(0);
  const inputRef = useRef(null);
  const expensiveCalculation = useMemo(() => {
    let total = 0;
    for (let i = 0; i < 1000000; i++) total += num;
    return total;
  }, [num]);
  const handleFocus = useCallback(() => { inputRef.current.focus(); }, []);

  return (
    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px', color: '#000' }}>
      <h3>Paso 4: Optimización (useMemo, useCallback, useRef)</h3>
      <input ref={inputRef} type="text" placeholder="Input con useRef" style={{ padding: '6px', marginRight: '8px' }} />
      <button onClick={handleFocus} style={{ padding: '6px 10px', cursor: 'pointer' }}>Enfocar</button>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setNum((p) => p + 1)} style={{ padding: '6px 10px', cursor: 'pointer' }}>Número: {num}</button>
        <p>Cálculo useMemo: {expensiveCalculation}</p>
      </div>
    </div>
  );
}

// Paso 5
function useMyFetch(url) {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    fetch(url).then((res) => res.json()).then((data) => setInfo(data));
  }, [url]);
  return { info };
}

function Paso5CustomHook() {
  const { info } = useMyFetch('https://jsonplaceholder.typicode.com/users/1');
  return (
    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px', color: '#000' }}>
      <h3>Paso 5: Hook Personalizado (useFetch)</h3>
      <p>Usuario: {info ? info.name : 'Cargando...'}</p>
    </div>
  );
}

// App Principal
export default function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <h2>Laboratorio de React Hooks</h2>
        <Paso1Counter />
        <Paso2Effect />
        <Paso3ContextConsumer />
        <Paso4Optimization />
        <Paso5CustomHook />
      </div>
    </ThemeProvider>
  );
}