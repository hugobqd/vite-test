import { Provider as JotaiProvider } from "jotai";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./pages/Home";

function App() {
  return (
    <JotaiProvider>
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </JotaiProvider>
  );
}

export default App;
