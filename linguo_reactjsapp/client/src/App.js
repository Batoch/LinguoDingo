import React from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/motrandom")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Anglais: {!data ? "Loading..." : data.en}</p>
        <p>Francais: {!data ? "Loading..." : data.fr}</p>
        <p>{!data ? "Loading..." : data.def.en}</p>
        <p>{!data ? "Loading..." : data.def.fr}</p>
      </header>
    </div>
  );
}

export default App;
