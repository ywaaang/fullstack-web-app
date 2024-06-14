"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Memo as MemoType } from "./types";
import * as dayjs from "dayjs";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<MemoType>[] = [
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "createTime",
    header: () => <div>Create Time</div>,
    cell: ({ row }) => {
      const createTime = parseFloat(row.getValue("createTime"))
      const formatted = dayjs(createTime).format('YYYY-MM-DD HH:mm')

      return <div>{formatted}</div>
    },
  }
]
