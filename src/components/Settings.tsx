import { useAtom } from "jotai";
import {
  Box,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { settingsAtom } from "../store";

export const Settings = () => {
  console.log("🔥 Settings");

  const [settings, setSettings] = useAtom(settingsAtom);

  return (
    <Box>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb={0}>Number of results</FormLabel>
        <NumberInput
          min={1}
          max={10}
          precision={0}
          value={settings.results}
          onChange={(valueAsString: string, valueAsNumber: number) =>
            setSettings({ results: valueAsNumber })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </Box>
  );
};
