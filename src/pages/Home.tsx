import { useAtom } from "jotai";
import { Stack, Button } from "@chakra-ui/react";
import { mainColorAtom } from "../store";
import { getStringRgbColor } from "../utils";
import { Search, Settings, Importer, Results } from "../components";

export const Home = () => {
  console.log("🔥 Home");

  const [mainColor, setMainColor] = useAtom(mainColorAtom);

  return (
    <Stack height="100vh" bg={getStringRgbColor(mainColor)} spacing={4} p={10}>
      <Settings />

      <Importer />

      <Search />

      <Results />

      <Stack direction="row">
        <Button onClick={() => setMainColor({ r: 255, g: 139, b: 213 })}>
          Pick Pink
        </Button>
        <Button onClick={() => setMainColor({ r: 24, g: 48, b: 119 })}>
          Pick Navy
        </Button>
      </Stack>
    </Stack>
  );
};
