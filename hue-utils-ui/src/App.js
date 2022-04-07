import logo from "./logo.svg";
import "./App.css";
import ListView from "./components/list-view";
import MenuBar from "./components/menu-bar";
import ShoppingList from "./components/shopping-list";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import data from "./test-data.json";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <MenuBar />
        </header>
        <body className="App-body">
          <Routes>
            <Route
              path="/alexa"
              element={
                <ListView data={data} title={"Rooms with smart devices."} />
              }
            />
            <Route path="/shopping" element={<ShoppingList />} />
          </Routes>
        </body>
      </div>
    </Router>
  );
}

export default App;
