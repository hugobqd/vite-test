import { useEffect } from "react";
import { useAtom } from "jotai";
import { Stack, Button } from "@chakra-ui/react";
import { mainColorAtom, settingsAtom, shadesAtom } from "../store";
import { getStringRGBColor } from "../utils";
import { Search, Settings } from "../components";
import { Importer } from "../components/Importer";

export const Home = () => {
  const [mainColor, setMainColor] = useAtom(mainColorAtom);
  const [settings] = useAtom(settingsAtom);
  const [shades] = useAtom(shadesAtom);

  useEffect(() => {
    console.log("🔥 Home");
  });

  return (
    <Stack height="100vh" bg={getStringRGBColor(mainColor)} spacing={10} p={10}>
      <Importer />

      <div>Shades ({shades.length})</div>
      <div>settings: {settings.results}</div>
      <Search />

      <Stack direction="row">
        <Button onClick={() => setMainColor({ r: 255, g: 139, b: 213 })}>
          Pick Pink
        </Button>
        <Button onClick={() => setMainColor({ r: 24, g: 48, b: 119 })}>
          Pick Navy
        </Button>
      </Stack>

      <Settings />
    </Stack>
  );
};
