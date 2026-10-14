import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function Paso3ContextConsumer() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={cardStyle}>
      <span style={badgeStyle}>Paso 3</span>
      <h3 style={titleStyle}>useContext (Estado Global de Tema)</h3>
      <p style={textStyle}>Modo actual: <strong>{theme.toUpperCase()}</strong></p>
      <button style={{...buttonStyle, backgroundColor: theme === 'light' ? '#1f2937' : '#e5e7eb', color: theme === 'light' ? '#fff' : '#000'}} onClick={toggleTheme}>
        Cambiar a modo {theme === 'light' ? 'Oscuro' : 'Claro'}
      </button>
    </div>
  );
}