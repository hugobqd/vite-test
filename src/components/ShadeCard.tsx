import { AspectRatio, Box, BoxProps, Stack, Text } from "@chakra-ui/react";
import { ShadeDistance } from "../types";
import { getBrightness } from "../utils";

interface ShadeCardType extends BoxProps {
  shade: ShadeDistance;
}

export const ShadeCard = ({ shade, ...rest }: ShadeCardType) => {
  const textColor = getBrightness(shade.rgb) > 128 ? "#000" : "#FFF";

  return (
    <Box bg={shade.hex} color={textColor} {...rest}>
      <AspectRatio>
        <Stack>
          <Text>{shade.name}</Text>
          <Text fontSize="sm">{shade.lib}</Text>
        </Stack>
      </AspectRatio>
    </Box>
  );
};
