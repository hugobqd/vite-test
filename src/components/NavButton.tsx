import { forwardRef, Button, ButtonProps, Box } from "@chakra-ui/react";

interface NavButtonProps extends ButtonProps {
  label: string;
  icon?: React.ReactElement;
  badge?: React.ReactElement;
}

export const NavButton = forwardRef<NavButtonProps, "button">(
  ({ label, icon, badge, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        aria-label={label}
        variant="ghost"
        colorScheme="whiteAlpha"
        color="white"
        px={2}
        position="relative"
        {...rest}
      >
        {icon}
        <Box ml={2} display={{ base: "none", sm: "block" }}>
          {label}
        </Box>
        {badge}
      </Button>
    );
  }
);
