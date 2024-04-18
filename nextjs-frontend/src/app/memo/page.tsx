"use client";
import Image from "next/image";
import { FormEventHandler, useState } from "react";
import {
    QueryMemoApi,
    CreateMemoApi,
    DeleteMemoByIDApi,
} from "../../endpoint/api";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Memo, columns } from "./column";
import { DataTable } from "./table";
import { MemoForm } from "./form";
import { Memo as MemoType } from "./types";
import { CreateDialog } from "./createDialog";

export default function Memo() {
    const [searchID, setSearchID] = useState('') as any;
    const {
        data: listData,
        error,
        mutate,
        isLoading,
    } = useSWR(`/memo/${searchID}`, QueryMemoApi);
    const handleSearch = async (values: Partial<MemoType>) => {
        setSearchID(values.id)
        mutate();
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
    return (
        <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 flex flex-col">
                <div className="flex md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <MemoForm onSearch={handleSearch} />
                </div>
                <div className="flex md:justify-start my-2 md:pt-0 px-8 md:px-24 lg:px-32">
                    <CreateDialog onCreate={handleCreate} />
                </div>

                {!isLoading && listData?.length && !error ? (
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <DataTable
                            columns={columns}
                            data={listData}
                            onDelete={handleDelete}
                        />
                    </div>
                ) : null}
            </div>

            <div className="w-1/2 shadow-2xl">
                <img
                    className="object-cover w-full h-screen hidden md:block"
                    src="https://source.unsplash.com/IXUM4cJynP0"
                    alt="login"
                />
            </div>
        </div>
    );
}
