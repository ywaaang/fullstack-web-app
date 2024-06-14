"use client";
import Image from "next/image";
import { FormEventHandler, useState } from "react";
import {
    QueryMemoApi,
    CreateMemoApi,
    DeleteMemoByIDApi,
    EditMemoByIDApi,
    FindMemoByIDApi
} from "../../fetch/api";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { columns } from "./column";
import { DataTable } from "./table";
import { Memo as MemoType } from "./types";
import { CreateDialog } from "./createDialog";
import { EditDialog } from "./editDialog";

export default function Memo() {
    const [searchID, setSearchID] = useState('') as any;
    const [isOpen, setIsOpen] = useState(false);
    const [editTarget, setEditTarget] = useState({} as MemoType);
    const {
        data: listData,
        error,
        mutate,
        isLoading,
    } = useSWR('list', QueryMemoApi);
    const handleSearch = async (values: Partial<MemoType>) => {
        setSearchID(values.id);
    };
    const handleCreate = async (values: MemoType) => {
        await CreateMemoApi(values);
        setSearchID('');
        mutate();
    };
    const handleDelete = async (values: Partial<MemoType>) => {
        await DeleteMemoByIDApi(values.id);
        setSearchID('');
        mutate();
    };
    const handleUpdate = (values: MemoType) => {
        setEditTarget(values);
        setIsOpen(true);
    }
    const handleEdit = async (values: MemoType) => {
        await EditMemoByIDApi(values);
        setEditTarget({} as MemoType);
        setIsOpen(false);
        mutate();
    }
    return (
        <div className="w-full flex flex-wrap py-20">
            <div className="w-full flex flex-col">
                <div className="w-full flex justify-between items-center">
                    <div className="flex md:justify-start my-2 md:pt-0 px-8 md:px-24 lg:px-32">
                        <CreateDialog onCreate={handleCreate} />
                    </div>
                </div>
                {!isLoading && listData?.data?.length && !error ? (
                    <div className="flex flex-col justify-center md:justify-start my-20 pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <DataTable
                            columns={columns}
                            data={listData.data}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    </div>
                ) : null}
                <EditDialog setOpen={setIsOpen} onEdit={handleEdit} open={isOpen} data={editTarget} />
            </div>
        </div>
    );
}
