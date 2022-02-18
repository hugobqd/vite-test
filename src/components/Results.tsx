import { useAtom } from "jotai";
import { Center, Flex, BoxProps } from "@chakra-ui/react";
import { settingsAtom, shadesSortedAtom } from "../store";
import { ShadeCard } from "./";

export const Results = (props: BoxProps) => {
  const [results] = useAtom(shadesSortedAtom);
  const [settings] = useAtom(settingsAtom);
  return (
    <Flex alignItems={"end"} {...props}>
      {results?.length &&
        results
          .slice(0, settings.results)
          .map((s, i) => <ShadeCard key={i} shade={s} flex={1 - i / 15} />)}
      {!results?.length && <Center>Please chose a library</Center>}
    </Flex>
  );
};
