import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { listAtom, shadesAtom } from "../store";
import * as importedLibs from "../libs";
import type { Lib, Shade } from "../types";

// interface Libs {
//   slug: string;
//   name: string;
//   colors: number[];
// }

interface LibsInObject {
  [key: string]: Lib;
}

const libs: LibsInObject = importedLibs;

// const libs: LooseObject = {
//   tailwindcss: {
//     slug: "tailwindcss",
//     name: "Tailwindcss",
//     colors: [10, 20, 30],
//   },
//   chakraui: {
//     slug: "chakraui",
//     name: "Chakra-UI",
//     colors: [11, 22, 33, 44, 55, 66, 77, 88, 99],
//   },
// };

export const Importer = () => {
  console.log(libs);

  // TODO: check if list in storage match imported libs key
  const [list, setList] = useAtom(listAtom);
  const [shades, setShades] = useAtom(shadesAtom);

  useEffect(() => {
    console.log(list);

    const newShades = list.reduce(
      (acc: Shade[], val: string) => [...acc, ...libs[val].colors],
      []
    );
    setShades(newShades);
  }, [list]);

  useEffect(() => {
    console.log("🔥 Importer");
  });

  return (
    <Stack border="1px" p={6}>
      <Text>
        Libraries{" "}
        <Badge rounded="full" colorScheme={list.length ? "blackAlpha" : "red"}>
          {list.length}
        </Badge>{" "}
        :
      </Text>
      <CheckboxGroup
        colorScheme="blackAlpha"
        value={list}
        onChange={(v: string[]) => setList(v)}
      >
        <Stack>
          {Object.keys(libs).map((key, index) => {
            const item = libs[key];
            return (
              <Checkbox value={key} key={key}>
                {item.name}
              </Checkbox>
            );
          })}
        </Stack>
      </CheckboxGroup>
      <Box as="pre">{shades.length}</Box>
    </Stack>
  );
};
