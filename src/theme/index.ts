import { extendTheme } from "@chakra-ui/react";
// import { SystemStyleObject } from "@chakra-ui/system"

export const theme = extendTheme({
  fonts: {
    mono:
      '"Red Hat MonoVariable", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  styles: {
    global: {
      "html, body": {
        minHeight: "100vh",
      },
      'body"': {
        minHeight: "100dvh",
      },
    },
  },
});
