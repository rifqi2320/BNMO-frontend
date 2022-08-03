import {
  Flex,
  Heading,
  useColorMode,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import TransactionTable from "../../components/tables/transactionTable";
import { useAuth } from "../../context/auth";
import { approveRequest, rejectRequest } from "../../lib/api";
import { AdminContext } from "../../types/context";
import { Transaction } from "../../types/models";

const Requests = () => {
  const { requests, revalidateRequests } = useOutletContext<AdminContext>();
  const { colorMode } = useColorMode();
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const toast = useToast();
  const { token } = useAuth();

  const onApprove = async (transaction: Transaction) => {
    await approveRequest(transaction.id, token)
      .then((res) => {
        if (!res.isError && res.data) {
          revalidateRequests();
          toast({
            title: "Success",
            description: res.message,
            status: "success",
          });
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

  const onReject = async (transaction: Transaction) => {
    await rejectRequest(transaction.id, token)
      .then((res) => {
        if (!res.isError && res.data) {
          revalidateRequests();
          toast({
            title: "Success",
            description: res.message,
            status: "success",
          });
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
    <>
      <Flex
        w={isSmallScreen ? "85vw" : "100%"}
        bg={colorMode === "dark" ? "gray.800" : "white"}
        m={isSmallScreen ? 0 : 10}
        borderRadius={isSmallScreen ? 0 : "3xl"}
        p={4}
        flexDir="column"
      >
        <Heading size="md">Requests Management</Heading>
        <TransactionTable
          transactions={requests}
          cols={["createdAt", "to", "description", "amount", "approved"]}
          onApprove={onApprove}
          onReject={onReject}
        />
      </Flex>
    </>
  );
};

export default Requests;
