import React from "react";
import { DataTable } from "./data-table";
import { User, columns } from "./columns";
import { getAllUser } from "@/lib/fetch";

const AdminPage = async () => {
  const data = await getAllUser();
  return (
    <div className="w-full">
      <DataTable columns={columns} data={JSON.parse(JSON.stringify(data))} />
    </div>
  );
};

export default AdminPage;
