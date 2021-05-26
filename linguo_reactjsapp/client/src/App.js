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
        <p>Anglais: {!data ? "Loading..." : data.Anglais}</p>
        <p>Francais: {!data ? "Loading..." : data.Francais}</p>
        <p>{!data ? "Loading..." : data.Def}</p>
      </header>
    </div>
  );
}

export default App;
