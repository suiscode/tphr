import React from "react";
import { getAllCV } from "@/lib/fetch";
import { CvColumn } from "./CvColumn";
import { CDataTable } from "./Cdata-table";

const AdminCVPage = async () => {
  const data = await getAllCV();
  return (
    <div className="w-full">
      <CDataTable columns={CvColumn} data={JSON.parse(JSON.stringify(data))} />
    </div>
  );
};

export default AdminCVPage;
