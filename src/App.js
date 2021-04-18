import { TutorialBanner } from "./Banner/TutorialBanner";
import { TeamGenerator } from "./Team/TeamGenerator";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Genshin Impact Team Builder</h1>
        <TutorialBanner />
        <TeamGenerator />
      </header>
    </div>
  );
}

export default App;
