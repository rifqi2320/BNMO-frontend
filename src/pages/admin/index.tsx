import { Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/layouts/sidebar";
import { useAuth } from "../../context/auth";
import { getRequests, getUsers } from "../../lib/api";
import { Transaction, User } from "../../types/models";

const Admin = () => {
  const { isLoading, user, token } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [requests, setRequests] = useState<Transaction[]>([]);
  const revalidateRequests = async () => {
    console.log("revalidateRequests");
    setRequests([]);
    await getRequests(token)
      .then((res) => {
        if (!res.isError && res.data) {
          setRequests(res.data.transactions);
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

  const [users, setUsers] = useState<User[]>([]);
  const revalidateUsers = async () => {
    setUsers([]);
    await getUsers(token)
      .then((res) => {
        if (!res.isError && res.data) {
          setUsers(res.data.users);
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

  useEffect(() => {
    if (!users || !users.length) {
      revalidateUsers();
    }
    if (!requests || !requests.length) {
      revalidateRequests();
    }

    if (!isLoading && user?.role !== "ADMIN") {
      if (user?.role === "USER") {
        navigate("/user");
        return;
      }
      navigate("/login");
      return;
    }
  });

  return (
    <Flex flexDir={"row"}>
      <Sidebar />
      <Outlet
        context={{ requests, revalidateRequests, users, revalidateUsers }}
      />
    </Flex>
  );
};

export default Admin;
