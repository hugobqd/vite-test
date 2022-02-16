import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Box, Stack, Button } from "@chakra-ui/react";
import { mainColorAtom, settingsAtom } from "../store";
import { getStringRGBColor } from "../utils";
import { Search, Settings } from "../components";

export const Home = () => {
  const [mainColor, setMainColor] = useAtom(mainColorAtom);
  const [settings] = useAtom(settingsAtom);

  return (
    <Stack height="100vh" bg={getStringRGBColor(mainColor)} spacing={10} p={10}>
      <div>{settings.results}</div>
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
