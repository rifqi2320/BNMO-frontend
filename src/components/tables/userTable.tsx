import { CheckIcon } from "@chakra-ui/icons";
import {
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { User } from "../../types/models";

type UserColumn =
  | "id"
  | "username"
  | "photoID"
  | "balance"
  | "isVerified"
  | "role"
  | "createdAt"
  | "updatedAt";

const UserData = {
  id: {
    label: "ID",
    render: (user: User) => user.id,
  },
  username: {
    label: "Username",
    render: (user: User) => user.username,
  },
  photoID: {
    label: "Photo ID",
    render: (user: User) => (
      <Link
        target={"_blank"}
        href={`https://drive.google.com/uc?export=view&id=${user.photoID}`}
        _hover={{
          textDecoration: "underline",
        }}
      >
        Photo ID
      </Link>
    ),
  },
  balance: {
    label: "Balance",
    render: (user: User) => (user.balance ? Math.floor(user.balance) : 0),
  },
  isVerified: {
    label: "Verified",
    render: (user: User) => (user.isVerified ? "Verified" : "Not Verified"),
  },
  role: {
    label: "Role",
    render: (user: User) => user.role,
  },
  createdAt: {
    label: "Created",
    render: (user: User) => new Date(user.createdAt).toDateString(),
  },
  updatedAt: {
    label: "Updated",
    render: (user: User) => new Date(user.updatedAt).toDateString(),
  },
};

const UserTable = ({
  users,
  cols,
  onVerify,
  ...props
}: {
  onVerify?: (user: User) => Promise<void>;
  users: User[];
  cols: UserColumn[];
}) => {
  const [page, setPage] = useState(1);
  const { colorMode } = useColorMode();

  if (!users) {
    return (
      <Center minH="200px">
        <Spinner color={colorMode === "dark" ? "white" : "black"} size={"xl"} />
      </Center>
    );
  }

  if (users.length === 0) {
    return (
      <Center minH="200px">
        <Heading>No Data</Heading>
      </Center>
    );
  }

  return (
    <Flex flexDir={"column"} w="100%" h="100%" {...props}>
      <Flex overflowX={"auto"}>
        <Table my={4}>
          <Thead>
            <Tr>
              {cols.map((col) => (
                <Th key={col}>{UserData[col].label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {users.slice((page - 1) * 4, page * 4).map((item) => (
              <Tr key={item.id}>
                {cols.map((col) => (
                  <Td key={col}>{UserData[col].render(item)}</Td>
                ))}
                {onVerify ? (
                  <Td>
                    <IconButton
                      icon={<CheckIcon />}
                      aria-label="verify"
                      disabled={item.isVerified}
                      onClick={() => onVerify(item)}
                    />
                  </Td>
                ) : null}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
      <Spacer />
      <HStack p={2} pt={0}>
        <Spacer />
        <Text>Page:</Text>
        <NumberInput
          w="75px"
          defaultValue={1}
          min={1}
          max={(users.length - 1) / 4 + 1}
          value={page}
          onChange={(_, num) => setPage(num)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </Flex>
  );
};

export default UserTable;
