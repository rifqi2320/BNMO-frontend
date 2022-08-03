import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { LoginReq } from "../types/api";
import ColorModeButton from "./../components/utils/colorModeButton";

const Login = () => {
  const { login } = useAuth();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState<LoginReq>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(formData.username, formData.password)
      .then((user) => {
        if (user) {
          if (user.role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          toast({
            title: "Error",
            description: err.response.data.message,
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
    <Center minH="100vh" w="100%">
      <ColorModeButton position="absolute" top="1rem" right="1rem" />
      <form onSubmit={handleSubmit}>
        <VStack
          p={8}
          gap={2}
          borderRadius="3xl"
          bg={colorMode === "dark" ? "teal.800" : "teal.300"}
        >
          <Heading>Login</Heading>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              bg="white"
              color="black"
              autoComplete="username"
              onChange={(e) => {
                setFormData((formData) => ({
                  ...formData,
                  username: e.target.value,
                }));
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              bg="white"
              color="black"
              onChange={(e) => {
                setFormData((formData) => ({
                  ...formData,
                  password: e.target.value,
                }));
              }}
              autoComplete="current-password"
              type="password"
            />
          </FormControl>
          <Flex w="100%" m={0}>
            <Flex flexDir={"column"} mr={8}>
              <Text my={-1}>Or you can</Text>
              <Link fontWeight={"bold"} href={"/register"}>
                Register Now
              </Link>
            </Flex>
            <FormControl w="min-content">
              <Button
                type="submit"
                colorScheme={colorMode === "dark" ? "yellow" : "red"}
              >
                Login
              </Button>
            </FormControl>
          </Flex>
        </VStack>
      </form>
    </Center>
  );
};

export default Login;
