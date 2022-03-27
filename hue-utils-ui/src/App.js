import logo from "./logo.svg";
import "./App.css";
import ListView from "./components/list-view";

function App() {
  console.log("here 1");
  return (
    <div className="App">
      <header className="App-header"></header>
      <body className="App-body">
        <ListView />
      </body>
    </div>
  );
}

export default App;
