import React from "react";
import { DataTable } from "./data-table";
import { User, columns } from "./columns";
import { getAllUser } from "@/lib/fetch";
import { NextResponse } from "next/server";

const AdminPage = async (context: any) => {
  const { res } = context;
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  const data = await getAllUser();
  console.log(data, 'GET ALL USER');
  
  return (
    <div className="w-full">
      <DataTable columns={columns} data={JSON.parse(JSON.stringify(data))} />
    </div>
  );
};

export default AdminPage;
