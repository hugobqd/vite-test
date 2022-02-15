import { Provider as JotaiProvider, useAtom } from "jotai";
import { Box, ChakraProvider, Stack, Button } from "@chakra-ui/react";
import { mainColorAtom, settingsAtom } from "./store";
import { getStringRGBColor } from "./utils";
import { Search, Settings } from "./components";

function App() {
  const [mainColor, setMainColor] = useAtom(mainColorAtom);
  const [settings] = useAtom(settingsAtom);

  return (
    <JotaiProvider>
      <ChakraProvider>
        <Stack
          height="100vh"
          bg={getStringRGBColor(mainColor)}
          spacing={10}
          p={10}
        >
          <Search />

          <Stack direction="row">
            <Button onClick={() => setMainColor({ r: 255, g: 139, b: 213 })}>
              Pick Pink
            </Button>
            <Button onClick={() => setMainColor({ r: 24, g: 48, b: 119 })}>
              Pick Navy
            </Button>
          </Stack>

          <Stack>
            <Settings />
            <Box as="pre">
              Settings: <span>{JSON.stringify(settings)}</span>
            </Box>
          </Stack>
        </Stack>
      </ChakraProvider>
    </JotaiProvider>
  );
}

export default App;
