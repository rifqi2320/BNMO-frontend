import { useOutletContext } from "react-router-dom";
import TransactionTable from "../../components/tables/transactionTable";
import { UserContext } from "../../types/context";

const History = () => {
  const { data } = useOutletContext<UserContext>();
  return (
    <TransactionTable
      transactions={data}
      cols={["createdAt", "amount", "from", "to", "description", "approved"]}
    />
  );
};

export default History;
