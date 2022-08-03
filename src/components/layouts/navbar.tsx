import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import ColorModeButton from "../utils/colorModeButton";

const Navbar = () => {
  const { logout } = useAuth();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [isVerySmallScreen] = useMediaQuery("(max-width: 380px)");
  const [image, setImage] = useState("/bmo/bmo_1.png");

  const randomizeBMO = () => {
    let num: number = 1;
    while (image.includes(num.toString())) {
      num = Math.floor(Math.random() * 3) + 1;
    }

    setImage("/bmo/bmo_" + num + ".png");
  };

  return (
    <HStack
      w="100vw"
      h="3.5rem"
      p="2"
      bg={colorMode === "dark" ? "teal.800" : "teal.300"}
      zIndex={5}
    >
      <Image src={image} h="100%" onClick={() => randomizeBMO()} />
      <Heading>BNMO</Heading>
      <Spacer />

      <ColorModeButton variant="ghost" />
      <Menu>
        <MenuButton as={Button} borderRadius="3xl" colorScheme={"gray"}>
          {isVerySmallScreen ? " " : "Balance : "}Rp.300.000,-{" "}
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Rifqi Naufal Abdjul">
            <Divider />
            <MenuItem onClick={() => navigate("/user/history")}>
              Transaction History
            </MenuItem>
            <MenuItem onClick={() => navigate("/user/transfer")}>
              Transfer
            </MenuItem>
            <MenuItem onClick={() => navigate("/user/request")}>
              Request Balance
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                logout();
              }}
            >
              Logout
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default Navbar;
