import { useAtom } from "jotai";
import {
  Flex,
  Stack,
  Button,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { searchAtom, favAtom, listAtom } from "../store";
import { getBrightness, getRgbString } from "../utils";
import { Search, Settings, Importer, Results, Favorites } from "../components";

export const Home = () => {
  console.log("🔥 Home");

  const [mainColor] = useAtom(searchAtom);
  const [fav] = useAtom(favAtom);
  const [list] = useAtom(listAtom);
  const textColor = getBrightness(mainColor.candidate) > 128 ? "#000" : "#FFF";

  return (
    <Stack
      direction="column"
      height="100vh"
      bg={getRgbString(mainColor.candidate)}
      color={textColor}
      fontFamily="mono"
      overflow="hidden"
    >
      <Flex p={6}>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" borderColor="currentcolor">
              Libraries ({list.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent mx={6}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Importer width="max-content" />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Spacer />
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" borderColor="currentcolor">
              Favorites ({fav.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent mx={6}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Favorites />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Spacer />
      <Search />
      <Spacer />
      <Flex justifyContent={"flex-end"} p={6}>
        <Settings />
      </Flex>
      <Results />
    </Stack>
  );
};
