import { Provider as JotaiProvider } from "jotai";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./pages/Home";
import { theme } from "./theme";
import "@fontsource/red-hat-mono/variable.css";

function App() {
  console.log("🔥 App");
  return (
    <JotaiProvider>
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    </JotaiProvider>
  );
}

export default App;
