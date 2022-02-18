import { useAtom } from "jotai";
import { Center, Flex } from "@chakra-ui/react";
import { settingsAtom, shadesSortedAtom } from "../store";
import { ShadeCard } from "./";

export const Results = () => {
  const [results] = useAtom(shadesSortedAtom);
  const [settings] = useAtom(settingsAtom);
  return (
    <Flex alignItems={"end"}>
      {results?.length &&
        results
          .slice(0, settings.results)
          .map((s, i) => <ShadeCard key={i} shade={s} flex={1 - i / 10} />)}
      {!results?.length && <Center>Please chose a library</Center>}
    </Flex>
  );
};
