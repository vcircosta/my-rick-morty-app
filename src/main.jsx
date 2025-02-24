import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const Star = () => {
  const style = {
    position: 'absolute',
    width: '2px',
    height: '2px',
    backgroundColor: 'white',
    borderRadius: '50%',
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: Math.random(),
  };

  return <div style={style}></div>;
};

const Stars = ({ count }) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(<Star key={i} />);
  }
  return <>{stars}</>;
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="bg-black min-h-screen relative overflow-hidden">
      <Stars count={200} />
      <App />
    </div>
  </StrictMode>,
)
