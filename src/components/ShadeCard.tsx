import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { Logo, MotionBox } from ".";
import { searchAtom, favAtom } from "../store";
import { ShadeDistance } from "../types";
import { getBrightness, getRgbString } from "../utils";

interface ShadeCardType extends BoxProps {
  shade: ShadeDistance;
}

const zIndex = {
  bg: 1,
  front: 2,
  info: 3,
  buttons: 4,
};

export const ShadeCard = ({ shade, ...rest }: ShadeCardType) => {
  const [fav, setFav] = useAtom(favAtom);
  const [mainColor, setMainColor] = useAtom(searchAtom);

  const [isHovered, setHovered] = useState(false);

  const textColor = getBrightness(shade.rgb) > 128 ? "black" : "white";
  const distance = `${Math.round(100 - shade.distance)} %`;

  const [isInFav, setInFav] = useState(false);

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
      tabIndex={0}
      {...rest}
    >
      <MotionBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        justifyContent="center"
        zIndex={zIndex.front}
        animate={{
          y: isHovered ? "-3em" : 0,
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.75 : 1,
        }}
      >
        <Box
          fontSize="1.1em"
          mb={"1em"}
          color={textColor}
          fontWeight="semibold"
          isTruncated
        >
          {shade.name}
        </Box>
        <HStack color={`${textColor}Alpha.700`} display="inline-flex">
          <Logo lib={shade.slug} />
          <Box fontSize=".75em">{shade.slug}</Box>
        </HStack>
      </MotionBox>

      <AspectRatio ratio={1} position="relative" bg="white" color="black">
        <Flex
          direction="column"
          height="100%"
          className="flex"
          alignItems="stretch !important"
          p="1em"
        >
          <Box flex={1} borderRadius="md" position="relative">
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
            />
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
                fontSize="sm"
                px=".33em"
              >
                {distance}
              </Box>
            </MotionBox>
            <MotionBox
              position="absolute"
              top=".5em"
              right=".5em"
              zIndex={zIndex.buttons}
              animate={{
                x: isHovered ? 0 : ".5em",
                y: isHovered ? 0 : "-.5em",
                opacity: isHovered ? 1 : 0,
              }}
            >
              <HStack>
                <Button
                  size="xs"
                  color="inherit"
                  bg={`${"white"}Alpha.700`}
                  onClick={() =>
                    setMainColor({
                      ...mainColor,
                      candidate: shade.rgb,
                    })
                  }
                >
                  Pick
                </Button>
                <Button
                  size="xs"
                  color={isInFav ? "white" : "black"}
                  bg={`${isInFav ? "black" : "white"}Alpha.700`}
                  onClick={() => handleFav(shade)}
                >
                  Save
                </Button>
              </HStack>
            </MotionBox>
          </Box>
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
            <Box fontSize="1.1em" fontWeight="semibold" isTruncated>
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
