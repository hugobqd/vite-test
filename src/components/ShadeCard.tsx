import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Logo } from ".";
import { searchAtom } from "../store";
import { ShadeDistance } from "../types";
import { getBrightness } from "../utils";

interface ShadeCardType extends BoxProps {
  shade: ShadeDistance;
}

export const ShadeCard = ({ shade, ...rest }: ShadeCardType) => {
  const [mainColor, setMainColor] = useAtom(searchAtom);

  const textColor = getBrightness(shade.rgb) > 128 ? "black" : "white";
  const bgColor = getBrightness(shade.rgb) > 128 ? "white" : "black";

  return (
    <Box bg={shade.hex} color={textColor} {...rest}>
      <AspectRatio>
        <Stack spacing={2}>
          <Text fontSize="lg">{shade.name}</Text>
          <HStack justifyContent="center" color={`${textColor}Alpha.700`}>
            <Logo lib={shade.slug} />
            <Text fontSize="sm" fontWeight="semibold">
              {shade.slug}
            </Text>
          </HStack>
          {shade.distance === 0 && <Text fontSize="sm">Perfect match</Text>}
          {shade.distance !== 0 && (
            <Text fontSize="sm">{Math.round(100 - shade.distance)} %</Text>
          )}
          <Button
            size="xs"
            color="inherit"
            bg={`${bgColor}Alpha.300`}
            // TODO: populate input, create his how function
            onClick={() =>
              setMainColor({
                ...mainColor,
                candidate: shade.rgb,
              })
            }
          >
            Pick
          </Button>
        </Stack>
      </AspectRatio>
    </Box>
  );
};
