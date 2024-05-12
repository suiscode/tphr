"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type CV = {
  _id: string;
  about?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  firstName?: string;
  lastName?: string;
  registerID?: string;
  gender?: string;
  bDay?: Date;
  phoneNumber?: string;
  email: string;
  address?: string;
  career?: string;
  salaryExpectency?: string;
  workDuration?: string;
  GPA: string;
  schoolName: string;
  schoolCountry: string;
  degree: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
};

export const CvColumn: ColumnDef<CV>[] = [
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "career",
    header: "Career",
  },
  {
    accessorKey: "registerID",
    header: "Register ID",
  },
  {
    accessorKey: "salaryExpectency",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Salary
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
  },
  {
    accessorKey: "workDuration",
    header: "Work Duration",
  },
  {
    accessorKey: "degree",
    header: "Degree",
  },
  {
    accessorKey: "schoolName",
    header: "School Name",
  },
  {
    accessorKey: "schoolCountry",
    header: "School Country",
  },
  {
    accessorKey: "GPA",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            GPA
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
  },
];
