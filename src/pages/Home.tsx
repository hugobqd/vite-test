import { useAtom } from "jotai";
import {
  Flex,
  Stack,
  Button,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { searchAtom } from "../store";
import { getBrightness, getRgbString } from "../utils";
import { Search, Settings, Importer, Results } from "../components";

export const Home = () => {
  console.log("🔥 Home");

  const [mainColor] = useAtom(searchAtom);
  const textColor = getBrightness(mainColor.candidate) > 128 ? "#000" : "#FFF";

  return (
    <Stack
      direction="column"
      height="100vh"
      bg={getRgbString(mainColor.candidate)}
      color={textColor}
      fontFamily="mono"
    >
      <Flex p={6}>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" borderColor="currentcolor">
              Libs
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
