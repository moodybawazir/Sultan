import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppStore } from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import Reader from './pages/Reader';
import Settings from './pages/Settings';
import AudioPlayer from './pages/AudioPlayer';

export default function App() {
  const theme = useAppStore(state => state.theme);

  useEffect(() => {
    document.documentElement.className = '';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="read/:surahId" element={<Reader />} />
          <Route path="audio" element={<AudioPlayer />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
