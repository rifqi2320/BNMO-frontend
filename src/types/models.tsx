export type Transaction = {
  id: string;
  from: string | null;
  to: string;
  description: string | null;
  amount: number;
  approved: boolean;
  approvedAt: string | null;
  createdAt: string;
};

export type User = {
  id: string;
  username: string;
  photoID?: string;
  balance?: number;
  isVerified: boolean;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};
