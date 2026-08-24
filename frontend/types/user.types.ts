// src/types/user.types.ts

export type UserRole =
  | "administrator" 
  | "administration"
  | "author"
  | "user"


export type UserStatus =
  | "active"
  | "inactive"
  | "blocked";


export interface User {
  _id: string;

  name: string;
  email: string;

  phone: string | null;
  address: string | null;

  department?: string | null;

  role: UserRole;

  profileImage: string | null;

  bio: string | null;

  status: UserStatus;

  isVerified: boolean;

  createdAt: string;
  updatedAt: string;
}