import { useAtom } from "jotai";
import { Flex, Stack, Button, Spacer } from "@chakra-ui/react";
import { searchAtom } from "../store";
import { getBrightness, getStringRgbColor } from "../utils";
import { Search, Settings, Importer, Results } from "../components";

export const Home = () => {
  console.log("🔥 Home");

  const [mainColor, setMainColor] = useAtom(searchAtom);
  const textColor = getBrightness(mainColor.candidate) > 128 ? "#000" : "#FFF";

  return (
    <Flex
      direction="column"
      height="100vh"
      bg={getStringRgbColor(mainColor.candidate)}
      color={textColor}
    >
      <Stack shouldWrapChildren p={6}>
        <Settings />
        <Importer width="max-content" />
        <Search />

        <Stack direction="row">
          <Button
            onClick={() =>
              setMainColor({
                ...mainColor,
                candidate: { r: 255, g: 139, b: 213 },
              })
            }
          >
            Pick Pink
          </Button>
          <Button
            onClick={() =>
              setMainColor({
                ...mainColor,
                candidate: { r: 24, g: 48, b: 119 },
              })
            }
          >
            Pick Navy
          </Button>
        </Stack>
      </Stack>
      <Spacer />
      <Results />
    </Flex>
  );
};
