import { useAtom } from "jotai";
import { Box, Center, Stack } from "@chakra-ui/react";
import { RgbColorPicker, RgbColor } from "react-colorful";
import { getStringRgbColor, getBrightness } from "../utils";
import { mainColorAtom } from "../store";

export const Search = () => {
  console.log("🔥 Search");

  const [color, setColor] = useAtom(mainColorAtom);
  const textColor = getBrightness(color) > 128 ? "#000" : "#FFF";

  const handlePickerChange = (color: RgbColor) => {
    console.log("🎨", color);
    setColor(color);
  };

  return (
    <Center color={textColor}>
      <Stack direction="row" alignItems="center">
        <Box>
          <RgbColorPicker color={color} onChange={handlePickerChange} />
        </Box>
        <Box minWidth="10rem">{getStringRgbColor(color)}</Box>
      </Stack>
    </Center>
  );
};
