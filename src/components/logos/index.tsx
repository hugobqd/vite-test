import { IconProps } from "@chakra-ui/react";
import { AntDesign } from "./antdesign";
import { BootstrapLogo } from "./bootstrap";
import { ChakraUiLogo } from "./chakraui";
import { CssLogo } from "./css";
import { MaterialLogo } from "./material";
import { Tailwindcss } from "./tailwindcss";

interface LogoType extends IconProps {
  lib: string;
}

export const Logo = ({ lib, ...rest }: LogoType) => {
  switch (lib) {
    case "antdesign":
    case "antdesigndark":
      return <AntDesign {...rest} />;
    case "bootstrap":
      return <BootstrapLogo {...rest} />;
    case "chakraui":
      return <ChakraUiLogo {...rest} />;
    case "css":
      return <CssLogo {...rest} />;
    case "material":
      return <MaterialLogo {...rest} />;
    case "tailwindcss":
      return <Tailwindcss {...rest} />;

    default:
      return null;
  }
};
