import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Center,
  Flex,
  HStack,
  IconButton,
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
import { Transaction } from "../../types/models";

type TransactionColumn =
  | "id"
  | "from"
  | "to"
  | "description"
  | "amount"
  | "approved"
  | "approvedAt"
  | "createdAt";

const TransactionData = {
  id: {
    label: "ID",
    render: (transaction: Transaction) => transaction.id,
  },
  from: {
    label: "From",
    render: (transaction: Transaction) => transaction.from,
  },
  to: {
    label: "To",
    render: (transaction: Transaction) => transaction.to,
  },
  description: {
    label: "Description",
    render: (transaction: Transaction) => transaction.description,
  },
  amount: {
    label: "Amount",
    render: (transaction: Transaction) =>
      transaction.amount.toLocaleString("en-US", {
        style: "currency",
        currency: "IDR",
      }),
  },
  approved: {
    label: "Status",
    render: (transaction: Transaction) =>
      transaction.approved ? "Approved" : "Pending",
  },
  approvedAt: {
    label: "Approved At",
    render: (transaction: Transaction) =>
      transaction.approvedAt ? transaction.approvedAt.toDateString() : "",
  },
  createdAt: {
    label: "Date",
    render: (transaction: Transaction) => transaction.createdAt.toDateString(),
  },
};

const TransactionTable = ({
  transactions,
  cols,
  onApprove,
  onReject,
  ...props
}: {
  onApprove?: (transaction: Transaction) => Promise<void>;
  onReject?: (transaction: Transaction) => Promise<void>;
  transactions: Transaction[];
  cols: TransactionColumn[];
}) => {
  const [page, setPage] = useState(1);
  const { colorMode } = useColorMode();

  if (!transactions || transactions.length === 0) {
    return (
      <Center minH="200px">
        <Spinner color={colorMode === "dark" ? "white" : "black"} size={"xl"} />
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
                <Th key={col}>{TransactionData[col].label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {transactions.slice((page - 1) * 5, page * 5).map((item) => (
              <Tr key={item.id}>
                {cols.map((col) => (
                  <Td key={col}>{TransactionData[col].render(item)}</Td>
                ))}
                {onApprove && onReject ? (
                  <Td>
                    <HStack>
                      <IconButton
                        icon={<CheckIcon />}
                        aria-label="approve"
                        disabled={item.approved}
                        onClick={() => onApprove(item)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="reject"
                        disabled={item.approved}
                        onClick={() => onReject(item)}
                      />
                    </HStack>
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
          max={(transactions.length - 1) / 5 + 1}
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

export default TransactionTable;
