import './App.css';
import Game from './screens/game';
import { Header } from './components/header';

const App = () => {

  return (
    <div className="App">
      <Header/>
      <Game/>
    </div>
  );
}

export default App;
