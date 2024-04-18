"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Memo = {
  id: string
  content: string
  date: string
}

export const columns: ColumnDef<Memo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]
