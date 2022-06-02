import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  AspectRatio,
  Box,
  BoxProps,
  Icon,
  Center,
  Flex,
  HStack,
  IconButton,
  Stack,
  useClipboard,
  Input,
} from "@chakra-ui/react";
import { Logo, MotionBox } from ".";
import { searchAtom, favAtom } from "../store";
import { ShadeDistance } from "../types";
import { getBrightness, getRgbString } from "../utils";
import { RiSipLine, RiHeartFill, RiHeartLine } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";

interface ShadeCardType extends BoxProps {
  shade: ShadeDistance;
}

const zIndex = {
  bg: 1,
  front: 2,
  info: 3,
  copy: 4,
  buttons: 5,
};

export const ShadeCard = ({ shade, ...rest }: ShadeCardType) => {
  const [fav, setFav] = useAtom(favAtom);
  const [mainColor, setMainColor] = useAtom(searchAtom);

  const [isHovered, setHovered] = useState(false);

  const textColor = getBrightness(shade.rgb) > 128 ? "black" : "white";
  const distance = `${Math.round(100 - shade.distance)}%`;

  const [isInFav, setInFav] = useState(false);

  const { hasCopied, onCopy } = useClipboard(shade.name);

  useEffect(() => {
    if (!fav.length) {
      setInFav(false);
    }
    // Finding with for loop is the most performant
    // https://nikitahl.com/how-to-find-an-item-in-a-javascript-array/
    for (let i = 0; i < fav.length; i++) {
      if (fav[i].id === shade.id) {
        console.log("🍧 in fav", fav[i]);
        setInFav(true);
        break;
      } else {
        setInFav(false);
      }
    }
  }, [shade, fav]);

  const handleFav = (shadeDist: ShadeDistance) => {
    if (!isInFav) {
      setFav([...fav, shadeDist]);
    } else {
      const favNew = fav.filter((obj) => {
        return obj.id != shade.id;
      });
      setFav(favNew);
    }
  };

  const colorFormat = () => {
    switch (mainColor.format) {
      case "hex":
        return shade.hex;
      case "rgb":
        return getRgbString(shade.rgb);
      case "hsl":
        return getRgbString(shade.rgb);

      default:
        break;
    }
  };

  return (
    <Box
      position="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      overflow="hidden"
      tabIndex={0}
      {...rest}
    >
      <AspectRatio ratio={1} position="relative" bg="white" color="black">
        <Flex
          direction="column"
          height="100%"
          className="flex"
          alignItems="stretch !important"
          p="1em"
        >
          <AnimatePresence>
            {!isHovered && (
              <MotionBox
                as={Center}
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={11}
                initial={{ opacity: 0, y: "-6em" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-6em" }}
              >
                <Box textAlign="center">
                  <Box
                    fontSize="1.1em"
                    mb=".33em"
                    color={textColor}
                    fontWeight="semibold"
                    noOfLines={1}
                  >
                    {shade.name}
                  </Box>
                  <HStack color={`${textColor}Alpha.700`} display="inline-flex">
                    <Logo lib={shade.slug} />
                    <Box fontSize=".75em">{shade.slug}</Box>
                  </HStack>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
          <MotionBox
            flex={1}
            borderRadius="md"
            position="relative"
            zIndex={zIndex.front}
            // border="3px dashed lime"
            // animate={{
            //   opacity: isHovered ? 1 : 0,
            // }}
          >
            <MotionBox
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg={shade.hex}
              animate={{
                scale: isHovered ? 1 : 3,
                y: isHovered ? 0 : "2.5em",
              }}
              borderRadius="md"
              className="cell"
            />
            <AnimatePresence>
              {isHovered && (
                <MotionBox
                  // as={Center}
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  zIndex={zIndex.copy}
                  initial={{ opacity: 0, y: "6em" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "6em" }}
                  color={textColor}
                  // pointerEvents="none"
                  as="button"
                  onClick={onCopy}
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  {hasCopied ? "Copied" : "Copy"}
                </MotionBox>
              )}
            </AnimatePresence>

            <MotionBox
              top=".5em"
              left=".5em"
              zIndex={zIndex.buttons}
              position="absolute"
              animate={{
                x: isHovered ? 0 : "-.5em",
                y: isHovered ? 0 : "-.5em",
              }}
            >
              <Box
                color={textColor}
                height={6}
                display="flex"
                alignItems="center"
                fontSize=".8em"
                px=".33em"
              >
                {distance}
              </Box>
            </MotionBox>
            <Box
              position="absolute"
              top=".5em"
              right=".5em"
              zIndex={zIndex.buttons}
            >
              <HStack color={textColor}>
                <MotionBox
                  animate={{
                    x: isHovered ? 0 : ".5em",
                    y: isHovered ? 0 : "-.5em",
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  <IconButton
                    aria-label="Pick this color"
                    icon={
                      <Icon as={RiSipLine} color="currentColor" boxSize={5} />
                    }
                    color="inherit"
                    size="sm"
                    variant="ghost"
                    // bg={`${"white"}Alpha.700`}
                    onClick={() =>
                      setMainColor({
                        ...mainColor,
                        candidate: shade.rgb,
                      })
                    }
                  />
                </MotionBox>
                <MotionBox
                  animate={{
                    x: isHovered ? 0 : ".5em",
                    y: isHovered ? 0 : "-.5em",
                    opacity: isHovered || isInFav ? 1 : 0,
                  }}
                >
                  <IconButton
                    aria-label={
                      isInFav ? "Remove from favorites" : "Save in favorites"
                    }
                    icon={
                      <Icon
                        as={isInFav ? RiHeartFill : RiHeartLine}
                        color="currentColor"
                        boxSize={5}
                      />
                    }
                    color="inherit"
                    size="sm"
                    variant="ghost"
                    // bg={`${"white"}Alpha.700`}
                    onClick={() => handleFav(shade)}
                  />
                </MotionBox>
              </HStack>
            </Box>
          </MotionBox>
          <MotionBox
            as={Stack}
            textAlign="left"
            spacing={0}
            pt={".5em"}
            zIndex={zIndex.info}
            lineHeight="short"
            animate={{
              y: isHovered ? 0 : "5em",
              opacity: isHovered ? 1 : 0,
            }}
          >
            <Box fontSize="1.1em" fontWeight="semibold" noOfLines={1}>
              {shade.name}
            </Box>
            <HStack fontSize=".8em">
              <Logo lib={shade.slug} boxSize="1em" />
              <Box>{shade.slug}</Box>
            </HStack>
            <Box fontSize=".8em">{colorFormat()}</Box>
          </MotionBox>
        </Flex>
      </AspectRatio>
    </Box>
  );
};
