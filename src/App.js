import { Roster } from './Character/RosterRenderer';
import { TeamInput } from './Team/TeamInput';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="roster-grid">
            <Roster/>
        </div>        
        <TeamInput/>
      </header>
    </div>
  );
}

export default App;
