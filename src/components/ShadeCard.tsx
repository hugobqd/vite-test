import { AspectRatio, Box, BoxProps, Stack, Text } from "@chakra-ui/react";
import { ShadeDistance } from "../types";

interface ShadeCardType extends BoxProps {
  shade: ShadeDistance;
}

export const ShadeCard = ({ shade, ...rest }: ShadeCardType) => {
  return (
    <Box bg={shade.hex} border="1px" borderColor="white" {...rest}>
      <AspectRatio>
        <Stack>
          <Text>{shade.name}</Text>
          <Text fontSize="sm">{shade.lib}</Text>
        </Stack>
      </AspectRatio>
    </Box>
  );
};
