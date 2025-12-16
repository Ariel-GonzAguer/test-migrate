import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useUserStore from "./store/useStore";

function App() {
  const [count, setCount] = useState(0);
  const {
    count: storeCount,
    increment,
    otroEstado,
    objetoEstado,
  } = useUserStore();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <h2>Estado Local</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => window.location.reload()}>Recargar</button>

        <h2>Estado Global (Store)</h2>
        <p>
          Count Store: <strong>{storeCount}</strong>
        </p>
        <p>
          Otro Estado: <strong>{otroEstado}</strong>
        </p>
        <p>
          Objeto Estado: <strong>{JSON.stringify(objetoEstado)}</strong>
        </p>
        <button onClick={increment}>Increment Store Count</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
