import './App.css';
import { Card, CardsWrapper, PawCard } from './components/cards';

function App() {
  return (
    <div className="App">
      
      <CardsWrapper>
        <PawCard/>
        <PawCard/>
        <PawCard/>
        <PawCard/>
        <PawCard/>
      </CardsWrapper>
    </div>
  );
}

export default App;
