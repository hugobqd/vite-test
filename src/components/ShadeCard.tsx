import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { searchAtom } from "../store";
import { ShadeDistance } from "../types";
import { getBrightness } from "../utils";

interface ShadeCardType extends BoxProps {
  shade: ShadeDistance;
}

export const ShadeCard = ({ shade, ...rest }: ShadeCardType) => {
  const [mainColor, setMainColor] = useAtom(searchAtom);

  const textColor = getBrightness(shade.rgb) > 128 ? "#000" : "#FFF";
  const bgColorscheme = getBrightness(shade.rgb) > 128 ? "white" : "black";

  return (
    <Box bg={shade.hex} color={textColor} {...rest}>
      <AspectRatio>
        <Stack spacing={1}>
          <Text>{shade.name}</Text>
          <Text fontSize="sm">{shade.lib}</Text>
          {shade.distance === 0 && <Text fontSize="sm">Perfect match</Text>}
          {shade.distance !== 0 && (
            <Text fontSize="sm">{Math.round(100 - shade.distance)} %</Text>
          )}
          <Button
            size="xs"
            color="inherit"
            bg={`${bgColorscheme}Alpha.300`}
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
