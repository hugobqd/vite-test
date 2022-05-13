import { Stack, HStack, Box, BoxProps, Flex, Button } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { favAtom } from "../store";
import { Logo } from "./logos";

export const Favorites = (props: BoxProps) => {
  const [fav, setFav] = useAtom(favAtom);

  return (
    <Stack spacing={1} pt={1} color="black" {...props}>
      {fav.map((item) => (
        <HStack key={item.id} spacing={3}>
          <Box w={5} h={5} rounded="sm" bg={item.hex} />
          <Box>
            <Logo lib={item.slug} color="blackAlpha.600" />
          </Box>
          <Box flex={1} fontWeight="semibold">
            {item.name}
          </Box>
        </HStack>
      ))}
      {!fav.length && <Box>You have no favorites</Box>}
      {!!fav.length && (
        <Flex justifyContent="flex-end">
          <Button
            size="xs"
            onClick={() => {
              setFav([]);
            }}
          >
            Clear all
          </Button>
        </Flex>
      )}
    </Stack>
  );
};
