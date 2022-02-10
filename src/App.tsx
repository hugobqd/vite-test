import { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Box, ChakraProvider } from "@chakra-ui/react";

const localCount = localStorage.getItem("localCount");
const initialCount: number = localCount ? JSON.parse(localCount) : 0;

function App() {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    localStorage.setItem("localCount", JSON.stringify(count));
  }, [count]);

  return (
    <ChakraProvider>
      <Box bg="red.100" className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Vite + React!</p>
          <p>
            <button
              type="button"
              onClick={() => setCount((count) => count + 1)}
            >
              count is: {count}
            </button>
          </p>
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {" | "}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
        </header>
      </Box>
    </ChakraProvider>
  );
}

export default App;
