import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useMediaQuery } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const ColorModeButton = ({ ...props }: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const location = useLocation();
  return (
    <>
      {isSmallScreen ? (
        <>
          <IconButton
            size={"md"}
            position="absolute"
            bottom={location.pathname.includes("admin") ? "5rem" : "2rem"}
            right="2rem"
            borderRadius={"full"}
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            aria-label="color mode button"
          />
        </>
      ) : (
        <IconButton
          size={"md"}
          {...props}
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          aria-label="color mode button"
        />
      )}
    </>
  );
};

export default ColorModeButton;
