export type Transaction = {
  id: string;
  from: string | null;
  to: string;
  description: string | null;
  amount: number;
  approved: boolean;
  approvedAt: Date | null;
  createdAt: Date;
};

export type User = {
  id: string;
  username: string;
  photoID?: string;
  balance?: number;
  isVerified: boolean;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
};
