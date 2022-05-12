import { useAtom } from "jotai";
import { Center, Flex, BoxProps, Box, Icon, HStack } from "@chakra-ui/react";
import { settingsAtom, shadesSortedAtom } from "../store";
import { ShadeCard } from "./";
import { RiArrowLeftUpLine } from "react-icons/ri";

const CARD_MINW = 220;
const CARD_MAXW = "40vh";

export const Results = (props: BoxProps) => {
  const [results] = useAtom(shadesSortedAtom);
  const [settings] = useAtom(settingsAtom);
  return (
    <Box scrollBehavior="auto" overflowX="auto" {...props}>
      {!!results?.length && (
        <Flex minWidth={`${settings.results * CARD_MINW}px`}>
          {results.slice(0, settings.results).map((s, i) => (
            <ShadeCard
              key={i}
              shade={s}
              //flex={1 - i / 25}
              flex={1}
              fontSize={`1em`}
              maxWidth={CARD_MAXW}
            />
          ))}
        </Flex>
      )}
      {!results?.length && (
        <Center height="200px">
          <HStack fontWeight="semibold">
            <Icon as={RiArrowLeftUpLine} boxSize={7} />
            <span>Please chose a library</span>
          </HStack>
        </Center>
      )}
    </Box>
  );
};
