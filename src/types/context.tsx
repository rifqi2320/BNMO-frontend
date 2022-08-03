import { Transaction, User } from "./models";

export type UserContext = {
  data: Transaction[];
  revalidate: () => Promise<void>;
};

export type AdminContext = {
  requests: Transaction[];
  revalidateRequests: () => Promise<void>;
  users: User[];
  revalidateUsers: () => Promise<void>;
};
