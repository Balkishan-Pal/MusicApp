import './App.css';
import { Route, Switch} from "react-router-dom";
import { Songs } from './components/SongsPage';
import { MainPage } from './components/MainPage';

function App() {
  return (
      <Switch>
        <Route exact path="/"><MainPage /></Route>
        <Route  path="/songs/:id"><Songs /></Route>
      </Switch>
  );
}

export default App;
