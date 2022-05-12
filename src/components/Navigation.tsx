import { useAtom } from "jotai";
import {
  Flex,
  Button,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Icon,
} from "@chakra-ui/react";
import { favAtom, listAtom } from "../store";
import { Importer, Favorites } from "../components";
import { RiPaletteFill, RiHeartFill } from "react-icons/ri";

export const Navigation = () => {
  const [fav] = useAtom(favAtom);
  const [list] = useAtom(listAtom);

  return (
    <Flex p={6}>
      <div></div>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="ghost"
            leftIcon={<Icon as={RiPaletteFill} boxSize={6} />}
          >
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
          <Button
            variant="ghost"
            leftIcon={<Icon as={RiHeartFill} boxSize={6} />}
          >
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
  );
};
