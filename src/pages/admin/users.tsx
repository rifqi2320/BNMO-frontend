import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  useColorMode,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserTable from "../../components/tables/userTable";
import { useAuth } from "../../context/auth";
import { verifyUser } from "../../lib/api";
import { AdminContext } from "../../types/context";
import { User } from "../../types/models";

const Users = () => {
  const { users, revalidateUsers } = useOutletContext<AdminContext>();
  const { colorMode } = useColorMode();
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const toast = useToast();
  const { token } = useAuth();

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);

  const onVerify = async (user: User) => {
    await verifyUser(user.id, token)
      .then((res) => {
        if (!res.isError && res.data) {
          revalidateUsers();
          toast({
            title: "Success",
            description: res.message,
            status: "success",
          });
        }
      })
      .catch((err) => {
        if (err.message) {
          toast({
            title: "Error",
            description: err.message,
            status: "error",
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
          });
        }
      });
  };

  return (
    <>
      <Flex
        w={isSmallScreen ? "85vw" : "100%"}
        bg={colorMode === "dark" ? "gray.800" : "white"}
        m={isSmallScreen ? 0 : 10}
        borderRadius={isSmallScreen ? 0 : "3xl"}
        p={4}
        flexDir="column"
      >
        <HStack>
          {isSmallScreen ? null : (
            <>
              <Heading size="md">User Management</Heading>
              <Spacer />
            </>
          )}

          <InputGroup w="min-content" minW="250px">
            <InputLeftElement
              pointerEvents={"none"}
              children={<SearchIcon />}
            />
            <Input
              maxW={isSmallScreen ? "" : "250px"}
              onChange={(e) => {
                const search = e.target.value.toLowerCase();
                setFilteredUsers(
                  users.filter((user) => {
                    return JSON.stringify(user.username)
                      .toLowerCase()
                      .includes(search);
                  })
                );
              }}
            />
          </InputGroup>
        </HStack>
        <UserTable
          users={filteredUsers}
          onVerify={onVerify}
          cols={[
            "username",
            "photoID",
            "balance",
            "isVerified",
            "createdAt",
            "updatedAt",
          ]}
        />
      </Flex>
    </>
  );
};

export default Users;
