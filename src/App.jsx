import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Forecast from './pages/Forecast';
import Alerts from './pages/Alerts';
import Disaster from './pages/Disaster';
import Agriculture from './pages/Agriculture';
import Travel from './pages/Travel';
import History from './pages/History';
import Locations from './pages/Locations';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="chat" element={<Chat />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="disaster" element={<Disaster />} />
        <Route path="agriculture" element={<Agriculture />} />
        <Route path="travel" element={<Travel />} />
        <Route path="history" element={<History />} />
        <Route path="locations" element={<Locations />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
