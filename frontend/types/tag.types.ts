// src/types/tag.types.ts

export interface Tag {
  _id: string;

  name: string;
  slug: string;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
}