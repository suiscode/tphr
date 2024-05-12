"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { careers, degree, salary } from "@/lib/model";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });
  const searchInputs = [
    { placeholder: "Last name", value: "lastName" },
    { placeholder: "Emails", value: "email" },
    { placeholder: "Phone number", value: "phoneNumber" },
    { placeholder: "Register ID", value: "registerID" },
  ];
  const searchSelect = [
    { placeholder: "Filter by career", value: "career", mapList: careers },
    {
      placeholder: "Filter by Salary",
      value: "salaryExpectency",
      mapList: salary,
    },
    { placeholder: "Filter by degree", value: "degree", mapList: degree },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-4 w-full">
          {searchInputs.map((item) => (
            <Input
              key={item.placeholder}
              placeholder={item.placeholder}
              value={
                (table.getColumn(item.value)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(item.value)?.setFilterValue(event.target.value)
              }
            />
          ))}
        </div>
        <div className="flex gap-4 w-full">
          {searchSelect.map((item) => (
            <div key={item.placeholder} className="flex flex-col">
              <h1>{item.placeholder}</h1>

              <Select
                onValueChange={(event) => {
                  console.log(event);
                  if (event === "ALL") {
                    table.getColumn(item.value)?.setFilterValue("");
                    return;
                  }
                  table.getColumn(item.value)?.setFilterValue(event);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">None</SelectItem>
                  {item.mapList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
