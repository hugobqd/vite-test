import { useAtom } from "jotai";
import { Box, Button, ButtonGroup, Input, Stack } from "@chakra-ui/react";
import { RgbColorPicker, RgbColor } from "react-colorful";
import { getRgbString } from "../utils";
import { searchAtom } from "../store";
import { TinyColor } from "@ctrl/tinycolor";
import { Picker } from "../types";

interface Update extends Partial<Picker> {}

export const Search = () => {
  console.log("🔥 Search");

  const [search, setSearch] = useAtom(searchAtom);

  const handlePicker = (rgb: RgbColor) => {
    console.log("🎨 handlePicker", rgb);
    const update: Update = {
      candidate: rgb,
      inputValid: true,
    };

    if (search.format === "rgb") {
      update.inputValue = getRgbString(rgb);
    }
    if (search.format === "hex") {
      update.inputValue = new TinyColor(
        getRgbString(search.candidate)
      ).toHexString();
    }
    if (search.format === "hsl") {
      update.inputValue = new TinyColor(
        getRgbString(search.candidate)
      ).toHslString();
    }

    setSearch({ ...search, ...update });
  };

  const handleInput = (value: string) => {
    const InputData = new TinyColor(value);
    console.log("🎨 handleInput", value, InputData);
    const update: Update = {
      inputValue: value,
      inputValid: InputData.isValid,
    };
    if (InputData.isValid) {
      update.candidate = InputData.toRgb();
    }
    if (
      InputData.format === "hex" ||
      InputData.format === "rgb" ||
      InputData.format === "hsl"
    ) {
      update.format = InputData.format;
    }

    setSearch({ ...search, ...update });
  };

  const handleFormat = (format: string) => {
    console.log("🎨 handleFormat", format);
    const update: Update = {
      format: format,
      inputValid: true,
    };

    if (format === "rgb") {
      update.inputValue = getRgbString(search.candidate);
    }
    if (format === "hex") {
      update.inputValue = new TinyColor(
        getRgbString(search.candidate)
      ).toHexString();
    }
    if (format === "hsl") {
      update.inputValue = new TinyColor(
        getRgbString(search.candidate)
      ).toHslString();
    }
    setSearch({ ...search, ...update });
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      rounded="8px"
      p={{ base: 3, md: 4, lg: 5 }}
      spacing={{ base: 3, md: 4, lg: 5 }}
      bg="white"
    >
      <Box>
        <RgbColorPicker
          color={search.candidate}
          onChange={(v) => handlePicker(v)}
        />
      </Box>
      <Stack color="gray.900" spacing={4}>
        <Input
          value={search.inputValue}
          onChange={(e) => handleInput(e.target.value)}
          isInvalid={!search.inputValid}
          textAlign="center"
        />
        <ButtonGroup isAttached size="xs" justifyContent="center">
          <Button
            variant={search.format === "hex" ? "solid" : "outline"}
            onClick={() => handleFormat("hex")}
          >
            HEX
          </Button>
          <Button
            variant={search.format === "rgb" ? "solid" : "outline"}
            onClick={() => handleFormat("rgb")}
            mr="-px"
          >
            RGB
          </Button>
          <Button
            variant={search.format === "hsl" ? "solid" : "outline"}
            onClick={() => handleFormat("hsl")}
          >
            HSL
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};
