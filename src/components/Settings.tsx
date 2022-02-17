import { Box } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { settingsAtom } from "../store";

export const Settings = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  useEffect(() => {
    console.log("🔥 Settings");
  });

  return (
    <Box>
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
    </Box>
  );
};
