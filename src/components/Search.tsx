import { useAtom } from "jotai";
import {
  Box,
  Button,
  Center,
  ButtonGroup,
  Input,
  Stack,
} from "@chakra-ui/react";
import { RgbColorPicker, RgbColor } from "react-colorful";
import { getStringRgbColor } from "../utils";
import { searchAtom } from "../store";
import { TinyColor } from "@ctrl/tinycolor";
import { Picker } from "../types";

interface Update extends Partial<Picker> {}

export const Search = () => {
  console.log("🔥 Search");

  const [search, setSearch] = useAtom(searchAtom);

  // TODO: make 'search' updatable from outside via 'color'
  // useEffect(() => {
  //   setSearch(createSearch(color));
  // }, [color]);

  const handlePicker = (rgb: RgbColor) => {
    console.log("🎨 handlePicker", rgb);
    const update: Update = {
      candidate: rgb,
      inputValid: true,
    };

    if (search.format === "rgb") {
      update.inputValue = getStringRgbColor(rgb);
    }
    if (search.format === "hex") {
      update.inputValue = new TinyColor(
        getStringRgbColor(search.candidate)
      ).toHexString();
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
    if (InputData.format === "hex" || InputData.format === "rgb") {
      update.format = InputData.format;
    } else {
      update.format = "none";
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
      update.inputValue = getStringRgbColor(search.candidate);
    }
    if (format === "hex") {
      update.inputValue = new TinyColor(
        getStringRgbColor(search.candidate)
      ).toHexString();
    }
    setSearch({ ...search, ...update });
  };

  return (
    <Center>
      <Stack direction="row" alignItems="center">
        <Box>
          <RgbColorPicker
            color={search.candidate}
            onChange={(v) => handlePicker(v)}
          />
        </Box>
        <Stack p={4} color="gray.900" bg="white">
          <Input
            value={search.inputValue}
            onChange={(e) => handleInput(e.target.value)}
            isInvalid={!search.inputValid}
          />
          <ButtonGroup isAttached size="sm">
            <Button
              variant={search.format === "rgb" ? "solid" : "outline"}
              onClick={() => handleFormat("rgb")}
              mr="-px"
            >
              RGB
            </Button>
            <Button
              variant={search.format === "hex" ? "solid" : "outline"}
              onClick={() => handleFormat("hex")}
            >
              HEX
            </Button>
          </ButtonGroup>
          {/* <Box as="pre" fontSize="11px">
            {JSON.stringify(search, null, 2)}
          </Box> */}
        </Stack>
      </Stack>
    </Center>
  );
};
