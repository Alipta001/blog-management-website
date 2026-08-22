// src/types/category.types.ts

export interface Category {
  _id: string;

  name: string;
  slug: string;

  description: string | null;
  image: string | null;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
}