import './App.css';
import SiteNavbar from './components/SiteNavbar';
import IndexPage from './pages/IndexPage/IndexPage';
import GuildPage from './pages/GuildPage/GuildPage';
import EncounterPage from './pages/EncounterPage/EncounterPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SiteNavbar/>
        <Routes>
          <Route path="/" element={<IndexPage/>}/>
          <Route path="/guild" element={<GuildPage/>}/>
          <Route path="/guild/:guildId" element={<GuildPage/>}/>
          <Route path='/guild/:guildId/encounter/:encounterId' element={<EncounterPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
