import {
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Tags,
  Users,
  History,
  FilePenLine,
  TrendingUp,
  Bell,
} from "lucide-react";

import type { SidebarItem } from "./sidebar.types";

import type { UserRole } from "@/types/user.types";

 
// ADMINISTRATION
 

const administrationSidebarItems: SidebarItem[] = [
  {
    name: "Overview",
    href: "/dashboard/administration",
    icon: LayoutDashboard,
  },

  {
    name: "Blogs",
    href: "/dashboard/administration/blogs",
    icon: BookOpen,
  },

  {
    name: "Categories",
    href: "/dashboard/administration/categories",
    icon: FolderKanban,
  },

  {
    name: "Comments",
    href: "/dashboard/administration/comments",
    icon: MessageSquare,
  },

  {
    name: "Tags",
    href: "/dashboard/administration/tags",
    icon: Tags,
  },

  {
    name: "Users",
    href: "/dashboard/administration/users",
    icon: Users,
  },
];

 
// AUTHOR
 

const authorSidebarItems: SidebarItem[] = [
  {
    name: "Overview",
    href: "/dashboard/author",
    icon: LayoutDashboard,
  },

  {
    name: "My Blogs",
    href: "/dashboard/author/myBlogs",
    icon: BookOpen,
  },

  {
    name: "Create Blog",
    href: "/dashboard/author/createBlog",
    icon: FilePenLine,
  },

  {
    name: "Comments",
    href: "/dashboard/author/comments",
    icon: MessageSquare,
  },

  {
    name: "Analytics",
    href: "/dashboard/author/analytics",
    icon: TrendingUp,
  },
];

 
// USER
 

const userSidebarItems: SidebarItem[] = [
  {
    name: "Overview",
    href: "/dashboard/reader",
    icon: LayoutDashboard,
  },
  {
    name: "All Blogs",
    href: "/dashboard/reader/allBlogs",
    icon: BookOpen,
  },

  {
    name: "Reading History",
    href: "/dashboard/reader/history",
    icon: History,
  },

  {
    name: "Notifications",
    href: "/dashboard/reader/notifications",
    icon: Bell,
  },
];

 
// SIDEBAR CONFIG
 

export const sidebarConfig: Record<UserRole, SidebarItem[]> = {
  administrator: administrationSidebarItems,

  administration: administrationSidebarItems,

  author: authorSidebarItems,

  user: userSidebarItems,
};
