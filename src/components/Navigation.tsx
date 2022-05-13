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
  IconButton,
  Badge,
  Box,
} from "@chakra-ui/react";
import { favAtom, listAtom } from "../store";
import { Importer, Favorites, NavButton } from "../components";
import { RiPaletteFill, RiHeartFill } from "react-icons/ri";

export const Navigation = () => {
  const [fav] = useAtom(favAtom);
  const [list] = useAtom(listAtom);

  return (
    <Flex p={{ base: 2, md: 3, lg: 6 }}>
      <Popover>
        <PopoverTrigger>
          <NavButton
            icon={<Icon as={RiPaletteFill} boxSize={6} />}
            label="Libraries"
            badge={
              <Badge
                colorScheme={list.length ? "whiteAlpha" : "red"}
                variant="solid"
                ml={2}
              >
                {list.length}
              </Badge>
            }
          />
        </PopoverTrigger>
        <PopoverContent mx={6}>
          <PopoverArrow />
          <PopoverBody>
            <Importer width="max-content" />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Spacer />
      <Popover>
        <PopoverTrigger>
          <NavButton
            icon={<Icon as={RiHeartFill} boxSize={6} />}
            label="Favorites"
            badge={
              <Badge
                colorScheme={fav.length ? "whiteAlpha" : "red"}
                variant="solid"
                ml={2}
              >
                {fav.length}
              </Badge>
            }
          />
        </PopoverTrigger>
        <PopoverContent mx={6}>
          <PopoverArrow />
          <PopoverBody>
            <Favorites />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
