import { useAtom } from "jotai";
import { Center, Flex, BoxProps, Box, Icon, HStack } from "@chakra-ui/react";
import { RiArrowLeftUpLine, RiPaletteFill } from "react-icons/ri";
import { SETTINGS, shadesSortedAtom } from "../store";
import { ShadeCard } from "./";

const CARD_MINW = "14em";
const CARD_MAXW = "40vh";

export const Results = (props: BoxProps) => {
  const [results] = useAtom(shadesSortedAtom);
  return (
    <Box className="wrapper" scrollBehavior="auto" overflowX="auto" {...props}>
      {!!results?.length && (
        <Flex
          className="row"
          minWidth={`calc(${SETTINGS.results} * ${CARD_MINW})`}
          fontSize={{
            base: "sm",
            md: "md",
          }}
        >
          {results.slice(0, SETTINGS.results).map((s, i) => (
            <ShadeCard
              key={i}
              shade={s}
              //flex={1 - i / 25}
              flex={1}
              maxWidth={CARD_MAXW}
            />
          ))}
        </Flex>
      )}
      {!results?.length && (
        <Center height="200px">
          <HStack fontWeight="semibold" alignItems="center">
            <Icon as={RiArrowLeftUpLine} boxSize={7} />
            <span>Chose a library</span>
            <Icon as={RiPaletteFill} boxSize={6} />
          </HStack>
        </Center>
      )}
    </Box>
  );
};
