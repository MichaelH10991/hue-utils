import logo from "./logo.svg";
import "./App.css";
import ListView from "./components/list-view";
import MenuBar from "./components/menu-bar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header"></header>
          <MenuBar />
        </div>
          <Routes>
            <Route path="/about">
              {"foo"}
            </Route>
            <Route path="/users">
              {"foo"}
            </Route>
            <Route path="/">
              {"foo"}
            </Route>
          </Routes>
      </Router>
  );
}

export default App;
